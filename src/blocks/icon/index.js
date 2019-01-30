/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import icons from './components/icons';
import Edit from './components/edit';
import svg from './icons/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { RichText, getColorClassName, getFontSizeClass } = wp.editor;

/**
 * Block constants
 */
const name = 'icon';

const title = __( 'Icon' );

const icon = icons.icon;

const keywords = [
	__( 'icon' ),
	__( 'icons' ),
	__( 'coblocks' ),
];

const blockAttributes = {
	icon: {
		type: 'string',
		default: 'book',
	},
	style: {
		type: 'string',
		default: 'filled',
	},
	align: {
		type: 'string',
	},
	backgroundColor: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
	height: {
		type: 'number',
		default: 100,
	},
	width: {
		type: 'number',
		default: 100,
	},
};

const settings = {

	title: title,

	description: __( 'Content and marketing icons.' ),

	keywords: keywords,

	attributes: blockAttributes,

	edit: Edit,

	styles: [
		{ name: 'filled', label: __( 'Filled' ), isDefault: true },
		{ name: 'outlined', label: __( 'Outlined' ) },
	],

	save( { attributes, className } ) {

		const {
			icon,
			style,
			backgroundColor,
			customBackgroundColor,
			customTextColor,
			textAlign,
			textColor,
			height,
			width,
		} = attributes;

		const textClass = getColorClassName( 'color', textColor );

		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const classes = classnames( 'wp-block-coblocks-icon__inner', {
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
			'has-background': backgroundColor || customBackgroundColor,
			[ backgroundClass ]: backgroundClass,
		} );

		const styles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			color: textClass ? undefined : customTextColor,
			fill: textClass ? undefined : customTextColor,
			textAlign: textAlign,
			height: height,
			width: width,
		};

		let iconStyle = 'filled';

		if( attributes.className ){
			if( attributes.className.includes( 'is-style-outlined' ) ){
				iconStyle = 'outlined';
			}else if( attributes.className.includes( 'is-style-rounded' ) ){
				iconStyle = 'rounded';
			}
		}

		return (
			<div className={ className }>
				<div className={ classes } style={ styles }>
					{ icon ? svg[ iconStyle ][ icon ] : svg[ iconStyle ].logo }
				</div>
			</div>
		);
	},
};

export { name, title, icon, settings };
