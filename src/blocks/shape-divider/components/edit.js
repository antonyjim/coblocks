/**
 * External dependencies
 */
import classnames from 'classnames';
import includes from 'lodash/includes';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import applyWithColors from './colors';
import dividers from './dividers';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { ResizableBox } = wp.components;

/**
 * Block edit function
 */
class Edit extends Component {

	constructor() {
		super( ...arguments );
	}

	getDividerFromStyles( className ) {

		// Check for the block style.
		const isStyleWavy = includes( className, 'is-style-wavy' );
		const isStyleWaves = includes( className, 'is-style-waves' );
		const isStyleSloped = includes( className, 'is-style-sloped' );
		const isStyleRounded = includes( className, 'is-style-rounded' );
		const isStyleAngled = includes( className, 'is-style-angled' );
		const isStyleTriangle = includes( className, 'is-style-triangle' );

		let divdier = dividers.wavy;

		if ( isStyleAngled ) {
			divdier = dividers.angled;
		} else if ( isStyleWavy ) {
			divdier = dividers.wavy;
		} else if ( isStyleSloped ) {
			divdier = dividers.sloped;
		} else if ( isStyleTriangle ) {
			divdier = dividers.triangle;
		} else if ( isStyleRounded ) {
			divdier = dividers.rounded;
		} else if ( isStyleWaves ) {
			divdier = dividers.waves;
		}

		return divdier;
	}

	render() {

		const {
			attributes,
			className,
			isSelected,
			setAttributes,
			toggleSelection,
			backgroundColor,
			color,
		} = this.props;

		const {
			height,
			verticalFlip,
			horizontalFlip,
		} = attributes;

		return [
			<Fragment>
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				<ResizableBox
					className={ classnames(
						className, {
							'is-selected': isSelected,
							'is-vertically-flipped' : verticalFlip,
							'is-horizontally-flipped' : horizontalFlip,
							'has-background': backgroundColor.color,
							'has-text-color': color.color,
							[ color.class ]: color.class,
						}
					) }
					style={ {
						backgroundColor: backgroundColor.color,
						color: color.color,
					} }
					size={ {
						height,
					} }
					minHeight="20"
					enable={ {
						top: false,
						right: false,
						bottom: true,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false,
					} }
					onResizeStop={ ( event, direction, elt, delta ) => {
						setAttributes( {
							height: parseInt( height + delta.height, 10 ),
						} );
						toggleSelection( true );
					} }
					onResizeStart={ () => {
						toggleSelection( false );
					} }
				>
					{ this.getDividerFromStyles( className ) }
				</ResizableBox>
			</Fragment>
		];
	}
};

export default compose( [
	applyWithColors,
] )( Edit );