import {
    DndContext,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core/dist/types/index'
import {
    SortableContext,
    arrayMove,
    horizontalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable'
import type { FC } from 'react'
import React, { useState, useEffect, useRef } from 'react'

import { PlusOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'
import { Space, Input, Tag, Tooltip, theme } from 'antd'

type Item = {
    id: number
    text: string
}

type DraggableTagProps = {
    tag: Item
}

const DraggableTag: FC<DraggableTagProps> = (props) => {
    const { tag } = props
    const { listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: tag.id })

    const commonStyle = {
        cursor: 'move',
        transition: 'unset', // Prevent element from shaking after drag
    }

    const style = transform
        ? {
              ...commonStyle,
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              transition: isDragging ? 'unset' : transition, // Improve performance/visual effect when dragging
          }
        : commonStyle

    return (
        <Tag style={style} ref={setNodeRef} {...listeners}>
            {tag.text}
        </Tag>
    )
}

export function DraggableTagComponent() {
    const { token } = theme.useToken()
    const [tags, setTags] = useState(['Unremovable', 'Tag 2', 'Tag 3'])
    const [inputVisible, setInputVisible] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [editInputIndex, setEditInputIndex] = useState(-1)
    const [editInputValue, setEditInputValue] = useState('')
    const inputRef = useRef<InputRef>(null)
    const editInputRef = useRef<InputRef>(null)

    const [items, setItems] = useState<Item[]>([
        {
            id: 1,
            text: 'Tag 1',
        },
        {
            id: 2,
            text: 'Tag 2',
        },
        {
            id: 3,
            text: 'Tag 3',
        },
    ])

    const sensors = useSensors(useSensor(PointerSensor))

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over) return

        if (active.id !== over.id) {
            setItems((data) => {
                const oldIndex = data.findIndex((item) => item.id === active.id)
                const newIndex = data.findIndex((item) => item.id === over.id)

                return arrayMove(data, oldIndex, newIndex)
            })
        }
    }

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus()
        }
    }, [inputVisible])

    useEffect(() => {
        editInputRef.current?.focus()
    }, [inputValue])

    const handleClose = (removedTag: string) => {
        const newTags = tags.filter((tag) => tag !== removedTag)
        console.log(newTags)
        setTags(newTags)
    }

    const showInput = () => {
        setInputVisible(true)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue])
        }
        setInputVisible(false)
        setInputValue('')
    }

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditInputValue(e.target.value)
    }

    const handleEditInputConfirm = () => {
        const newTags = [...tags]
        newTags[editInputIndex] = editInputValue
        setTags(newTags)
        setEditInputIndex(-1)
        setInputValue('')
    }

    const tagInputStyle: React.CSSProperties = {
        width: 78,
        verticalAlign: 'top',
    }

    const tagPlusStyle: React.CSSProperties = {
        background: token.colorBgContainer,
        borderStyle: 'dashed',
    }

    return (
        <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
        >
            <SortableContext
                items={items}
                strategy={horizontalListSortingStrategy}
            >
                {items.map((item) => (
                    <DraggableTag tag={item} key={item.id} />
                ))}
            </SortableContext>
        </DndContext>
    )
}
