import React, { useState, Fragment } from 'react'

import { Button, Input } from 'antd'
import { Typography } from 'antd'

const { Title, Text } = Typography

interface ListItemProps {
    item: any
}

class ListItem extends React.Component<ListItemProps, {}> {
    render() {
        return(
            <div>
               <Text>{this.props.item}</Text>
               <Button>Remove</Button>
            </div>
        )
    }
}

export default ListItem