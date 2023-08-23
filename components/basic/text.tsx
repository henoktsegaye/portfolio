interface Props {
    children: string
    classname: string
}

const Text = ({ classname, children }: Props) => {
    return (<h1
        className={`${classname ? classname : ''} text-transparent  bg-clip-text bg-gradient-to-r from-green-400 to-blue-600`}
    >
        {children}
    </h1>)
}

export default Text