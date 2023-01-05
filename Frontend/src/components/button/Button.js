import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ButtonStyles = styled.button`
	padding: 5px 10px;
	cursor: pointer;
	line-height: 1;
	font-weight: 300;
	display: block;
	border-radius: 2px;
	min-width: ${(props) => props.width || "20px"};
	height: ${(props) => props.height || "46px"};
	${(props) =>
		props.kind === "primary" &&
		css`
			font-weight: 500;
			font-size: 16px;
			position: relative;
			border: 1px solid transparent;
			background: #04040c;
			::before {
				content: "";
				position: absolute;
				inset: 0;
				z-index: -1;
				margin: -3px;
				background-image: linear-gradient(85.76deg, #bc61f3, #5c43f6);
				border-radius: inherit;
			}
			:hover {
				transition: all 0.2s ease-in;
				background: linear-gradient(85.76deg, #bc61f3, #5c43f6);
			}
		`};
	${(props) =>
		props.kind === "secondary" &&
		css`
			background: #30384d;
			font-weight: 500;
			font-size: 14px;
			line-height: 13px;
			font-style: normal;
			color: white;
			margin-bottom: 20px;
			:hover {
				background: linear-gradient(85.76deg, #bc61f3, #5c43f6);
				transition: all 0.2s ease-in;
			}
		`};
	${(props) =>
		props.active === true &&
		css`
			background: linear-gradient(85.76deg, #bc61f3, #5c43f6);
		`};
`;

const Button = ({
	className = "button-component",
	children,
	type = "button",
	kind = "primary",
	active = false,
	onClick = () => {},
	...props
}) => {
	const { to } = props;
	if (to !== "" && typeof to === "string") {
		return (
			<NavLink to={to} style={{ display: "inline-block" }}>
				<ButtonStyles
					className={`${className} ${active ? "active" : ""}`}
					type={type}
					active={active}
					kind={kind}
					onClick={onClick}
					{...props}
				>
					{children}
				</ButtonStyles>
			</NavLink>
		);
	}
	return (
		<ButtonStyles
			className={`${className} button-component ${active ? "active" : ""}`}
			type={type}
			active={active}
			kind={kind}
			onClick={onClick}
			{...props}
		>
			{children}
		</ButtonStyles>
	);
};

Button.propTypes = {
	type: PropTypes.oneOf(["button", "submit"]),
	isLoading: PropTypes.bool,
	onClick: PropTypes.func,
	children: PropTypes.node,
	kind: PropTypes.oneOf(["primary", "secondary"]),
};

export default Button;
