import React from 'react'
import { Typography } from 'antd'

const { Text } = Typography

interface ListItemProps {
    item: any
}

class ListItem extends React.Component<ListItemProps, {}> {
    render() {
        return(
            <div>
                <Text>{this.props.item}</Text>
            </div>
        )
    }
}

export default ListItem