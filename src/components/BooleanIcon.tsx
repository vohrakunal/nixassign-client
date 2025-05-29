
interface IBooleanIcon {
    status: boolean
    values: {
        true: any // icon
        false: any // icon
    }
    size?:any
}

export default function BooleanIcon (props: IBooleanIcon) {
    return (
        <>
            {props.status ? (
                <span className="text-success">
                    {props.values.true}
                </span>
            ) : (
                <span className="text-danger">
                    {props.values.false}
                </span>
            )}
        </>
    )
}