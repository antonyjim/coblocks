<?php
/**
 * Test includes/src/blocks/posts/test-index.php
 *
 * @package CoBlocks
 */
class CoBlocks_Posts_Index_Tests extends WP_UnitTestCase {

	public function setUp() {
		parent::setUp();

		include_once COBLOCKS_PLUGIN_DIR . 'src/blocks/posts/index.php';

		set_current_screen( 'edit-post' );
	}

	public function tearDown() {
		parent::tearDown();

		unset( $GLOBALS['current_screen'] );
	}

	/**
	 * Test the file actions are hooked properly
	 */
	public function test_file_actions() {
		$actions = [
			[ 'init', 'coblocks_register_posts_block' ],
		];

		foreach ( $actions as $action_data ) {
			$priority = isset( $action_data[2] ) ? $action_data[2] : 10;

			if ( ! has_action( $action_data[0], $action_data[1] ) ) {
				$this->fail( "$action_data[0] is not attached to $action_data[1]." );
			}
		}

		$this->assertTrue( true );
	}

	/**
	 * Test the posts block markup returns correctly
	 */
	public function test_coblocks_render_posts_block() {
		$attributes = [
			'className'    => 'test-class-name',
			'postsToShow'  => 4,
			'order'        => 'date',
			'orderBy'      => 'desc',
			'postFeedType' => 'internal',
		];

		$post_id = wp_insert_post(
			[
				'post_author'  => 1,
				'post_content' => '',
				'post_title'   => 'CoBlocks Posts Block',
				'post_status'  => 'publish',
			]
		);

		global $post;
		$post = get_post( $post_id );

		$this->assertEquals( '<div class="test-class-name"><div class="wp-block-coblocks-posts__inner"></div></div>', coblocks_render_posts_block( $attributes ) );
	}

	/**
	 * Test the posts block is registered
	 *
	 * @expectedIncorrectUsage WP_Block_Type_Registry::register
	 */
	public function test_coblocks_register_posts_block() {
		coblocks_register_posts_block();

		$expected_registered_blocks = [
			'coblocks/posts',
		];

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

		foreach ( $expected_registered_blocks as $coblocks_block ) {

			if ( ! array_key_exists( $coblocks_block, $registered_blocks ) ) {
				$this->fail( "$coblocks_block is not registered." );
			}
		}

		$this->assertTrue( true );
	}
}
