interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
	text?: string
	customClasses?: string
}

export default function Button(props: IButtonProps) {
	return (
		<button
			className={
				'mt-4 rounded-md bg-yellow-400 px-3 py-1 shadow-sm ' + props.customClasses
			}
		>
			{props.children}
		</button>
	)
}
