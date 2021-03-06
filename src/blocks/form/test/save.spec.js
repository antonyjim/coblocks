/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { registerBlockType, createBlock, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;
let serializedBlock;

describe( name, () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name );

		// Reset the reused variables.
		serializedBlock = '';
	} );

	it( 'should render with form details', () => {
		block.attributes.subject = 'Form subject';
		block.attributes.submitButtonText = 'Form submit button text';
		block.attributes.to = 'Form to text';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'Form subject' );
		expect( serializedBlock ).toContain( 'Form submit button text' );
		expect( serializedBlock ).toContain( 'Form to text' );
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );
