<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
//get saved subscriber list
$csmm_subscriber_count = 0;
$cmss_subscriber_list = array();
$cmss_subscriber_list = get_option('cmss_subscriber_list');
//print_r(($cmss_subscriber_list));
// remove all blank entries and reindex the array
if(is_array($cmss_subscriber_list)){
	$cmss_subscriber_list = array_reverse(array_filter(array_values($cmss_subscriber_list)));
	if(is_array($cmss_subscriber_list) && count($cmss_subscriber_list)) {
		$csmm_subscriber_count = count($cmss_subscriber_list);
	}
}
?>
<div class="m-3">
	<div class="row" style="--bs-gutter-x: 0rem;">
		<div class="col-md-6 p-2 border">
			<div class="row" style="--bs-gutter-x: 0rem;">
				<div class="col-md-6">
					<h5 class="float-left"><?php esc_html_e( 'Total Subscribers', 'coming-soon-maintenance-mode' ); ?>: <?php echo esc_html($csmm_subscriber_count); ?></h5>
				</div>
				<div class="col-md-6">
					<button type="button" class="btn btn-secondary float-end" onclick="return csmm_download_csv();"><i class="fa-solid fa-download"></i> <?php esc_html_e( 'Download List', 'coming-soon-maintenance-mode' ); ?></button>
				</div>
			</div>
		</div>
		<div class="col-md-12">
			<div class="row" style="--bs-gutter-x: 0rem;">
				<div class="col-md-6 border">
					<div class="table-responsive">
						<table class="table table-sm table-striped table-hover border-dark">
							<thead class="">
								<tr>
									<th scope="col" class="px-3"><?php esc_html_e( 'Email', 'coming-soon-maintenance-mode' ); ?></th>
								</tr>
							</thead>
							<tbody>
								<?php
								$total_records = 0;
								if(is_array($cmss_subscriber_list)){
									$data = $cmss_subscriber_list;

									// The page to display (Usually is received in a url parameter)
									if(isset($_GET['page-no']))
									$page = intval($_GET['page-no']);
									else
									$page = 1;

									// The number of records to display per page
									$page_size = 20;

									// Calculate total number of records, and total number of pages
									$total_records = count($data);
									$total_pages   = ceil($total_records / $page_size);

									// Validation: Page to display can not be greater than the total number of pages
									if ($page > $total_pages) {
										$page = $total_pages;
									}

									// Validation: Page to display can not be less than 1
									if ($page < 1) {
										$page = 1;
									}

									// Calculate the position of the first record of the page to display
									$offset = ($page - 1) * $page_size;

									// Get the subset of records to be displayed from the array
									$data = array_slice($data, $offset, $page_size);
									?>
									<?php foreach ($data as $key => $value) { ?>
										<tr>
											<td scope="row" class="px-3"><?php echo esc_html($value); ?></td>
										</tr>
									<?php } ?>

									<?php
									// variables for pagination links
									$page_first = $page > 1 ? 1 : '';
									$page_prev  = $page > 1 ? $page-1 : '';
									$page_next  = $page < $total_pages ? $page + 1 : '';
									$page_last  = $page < $total_pages ? $total_pages : '';
								}
								?>
							</tbody>
							
							<tfoot>
								<?php if($total_records > 20){ ?>
								<tr>
									<td scope="row">
										<div class="text-center">
											<div class="btn-group" role="group">
												<a class="btn btn-light border" href="admin.php?page=webenvo-csmm-subscribers&page-no=<?php echo esc_html($page_first); ?>">« <?php esc_html_e( 'First', 'coming-soon-maintenance-mode' ); ?></a>
												<a class="btn btn-light border" href="admin.php?page=webenvo-csmm-subscribers&page-no=<?php echo esc_html($page_prev); ?>"><?php esc_html_e( 'Prev', 'coming-soon-maintenance-mode' ); ?></a>
												<a class="btn btn-light border" href="admin.php?page=webenvo-csmm-subscribers&page-no=<?php echo esc_html($page_next); ?>"><?php esc_html_e( 'Next', 'coming-soon-maintenance-mode' ); ?></a>
												<a class="btn btn-light border" href="admin.php?page=webenvo-csmm-subscribers&page-no=<?php echo esc_html($page_last); ?>"><?php esc_html_e( 'Last', 'coming-soon-maintenance-mode' ); ?> »</a>
											</div>
										</div>
									</td>
								</tr>
								<?php } ?>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script>
function csmm_download_csv(){
	jQuery.ajax({
		type: 'POST',
		url: "<?php echo esc_url( admin_url('admin-ajax.php') ); ?>",
		data: {
			'action': 'csmm_save', //this is the name of the AJAX method called in WordPress
			'tab': 'csv-download',
			'nonce': "<?php echo esc_js( wp_create_nonce( 'csmm-save' ) ); ?>",
		}, 
		success: function (result) {
			//alert(result);
			if((result.indexOf("file-created") >= 0)) {
				<?php
				$csmm_upload_dir = wp_upload_dir();
				$csmm_create_file_url = $csmm_upload_dir['baseurl'] . '/subscriber-list.csv';
				?>
				window.open('<?php echo esc_js( $csmm_create_file_url ); ?>', '_blank');
			}
		},
		error: function () {
			//alert("error");
		}
	});
}
</script>