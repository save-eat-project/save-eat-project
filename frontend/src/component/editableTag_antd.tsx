import React, { useEffect, useRef, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'
import { Space, Input, Tag, Tooltip, theme } from 'antd'

//state 인터페이스
interface State {
    tags: string[]
    inputVisible: boolean
    inputValue: string
    editInputIndex: number
    editInputValue: string
    inputRef: React.RefObject<InputRef>
    editInputRef: React.RefObject<InputRef>
    newTagName: string
    duplicateTagName: string
}

export function EditableTagComponent() {
    const { token } = theme.useToken()

    const [state, setState] = useState<State>({
        tags: [],
        inputVisible: false,
        inputValue: '',
        editInputIndex: -1,
        editInputValue: '',
        inputRef: useRef<InputRef>(null),
        editInputRef: useRef<InputRef>(null),
        newTagName: '',
        duplicateTagName: '',
    })

    const tagInputStyle: React.CSSProperties = {
        width: 78,
        verticalAlign: 'top',
    }

    const tagPlusStyle: React.CSSProperties = {
        background: token.colorBgContainer,
        borderStyle: 'dashed',
    }

    useEffect(() => {
        if (state.inputVisible) {
            state.inputRef.current?.focus()
        }
    }, [state.inputVisible])

    useEffect(() => {
        state.editInputRef.current?.focus()
    }, [state.inputValue])

    const handleClose = (removedTag: string) => {
        const newTags = state.tags.filter((tag) => tag !== removedTag)

        setState({
            ...state,
            tags: newTags,
        })
    }

    //추가 버튼 눌렀을 때 표시되는 Input에 입력한 값 state 저장
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            inputValue: e.target.value,
        })
    }

    //입력 완료 이후 포커스해제 및 엔터 입력 시
    const handleInputConfirm = () => {
        var { tags, inputValue, newTagName } = state
        var duplicateItemIndex = tags.indexOf(inputValue)
        var duplicateTagName = ''

        if (state.inputValue && duplicateItemIndex === -1) {
            newTagName = state.inputValue
            tags.push(state.inputValue)
        } else {
            duplicateTagName = state.inputValue
        }

        setState({
            ...state,
            tags: tags,
            newTagName: newTagName,
            duplicateTagName: duplicateTagName,
            inputVisible: false,
            inputValue: '',
        })
    }

    //더블클릭 시 편집기능
    // const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setState({
    //         ...state,
    //         editInputValue: e.target.value,
    //     })
    // }

    // const handleEditInputConfirm = () => {
    //     const newTags = [...state.tags]
    //     newTags[state.editInputIndex] = state.editInputValue
    //     setState({
    //         ...state,
    //         tags: newTags,
    //         editInputIndex: -1,
    //         inputValue: '',
    //     })
    // }

    return (
        <Space size={[0, 8]} wrap>
            <Space size={[0, 8]} wrap>
                {state.tags.map((tag, index) => {
                    //더블클릭 시 편집 기능
                    // if (state.editInputIndex === index) {
                    //     return (
                    //         <Input
                    //             ref={state.editInputRef}
                    //             key={tag}
                    //             size="small"
                    //             style={tagInputStyle}
                    //             value={state.editInputValue}
                    //             onChange={handleEditInputChange}
                    //             onBlur={handleEditInputConfirm}
                    //             onPressEnter={handleEditInputConfirm}
                    //         />
                    //     )
                    // }
                    const isLongTag = tag.length > 20
                    const tagElem = (
                        <Tag
                            key={tag}
                            closable={true}
                            style={{ userSelect: 'none' }}
                            onClose={() => handleClose(tag)}
                            color={
                                index === state.tags.indexOf(state.duplicateTagName)
                                    ? 'red'
                                    : index === state.tags.indexOf(state.newTagName)
                                    ? 'gold'
                                    : ''
                            }
                        >
                            <span
                            //더블클릭 시 편집기능
                            // onDoubleClick={(e) => {
                            //     setState({
                            //         ...state,
                            //         editInputIndex: index,
                            //         editInputValue: tag,
                            //     })
                            //     e.preventDefault()
                            // }}
                            >
                                {isLongTag ? `${tag.slice(0, 10)}...` : tag}
                            </span>
                        </Tag>
                    )
                    return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                        tagElem
                    )
                })}
            </Space>
            {state.inputVisible ? (
                <Input
                    ref={state.inputRef}
                    type="text"
                    size="small"
                    style={tagInputStyle}
                    value={state.inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            ) : (
                <Tag
                    style={tagPlusStyle}
                    onClick={() => {
                        setState({
                            ...state,
                            inputVisible: true,
                            duplicateTagName: '',
                        })
                    }}
                >
                    <PlusOutlined /> 추가
                </Tag>
            )}
        </Space>
    )
}
