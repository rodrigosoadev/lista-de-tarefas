import React, { createRef, useEffect, useState } from 'react'
import TodoCalender from './TodoCalender'
import headerImage from '../components/img/header_img.png'
import { Zoom, Fade } from 'react-awesome-reveal'

// local storage for getItem()
const getLocalStorageItem = () => {
    const myList = localStorage.getItem('lists')
    if (myList) {
        return JSON.parse(localStorage.getItem('lists'))
    } else {
        return []
    }
}

function TodoItems() {
    const [input, setInput] = useState('')
    const [items, setItems] = useState(getLocalStorageItem)
    const [toggleSubmit, setToggleSubmit] = useState(true)
    const [isEdit, setIsEdit] = useState(null)

    let createRef = React.createRef()

    const handleClick = () => {
        if (!input) {
            createRef.current.innerHTML = 'Digite um item!'
            //alert('Digite um item!')
        } else if (input && !toggleSubmit) {
            setItems(items.map((element) => {
                if (element.id === isEdit) {
                    return {
                        ...element,
                        text: input
                    }
                }
                return element
            }))
        setToggleSubmit(true)
        setInput('')
        setIsEdit(null)

        } else {
            createRef.current.innerHTML = ''
            const allInput = {
                id: Math.floor(Math.random() * 10000),
                text: input
            }
            setItems([...items, allInput])
            setInput('')
        }

    }

    const editItem = (id) => {
        const updateItem = items.find((element) => {
            return element.id === id
        })
        setToggleSubmit(false)
        setInput(updateItem.text)
        setIsEdit(id)
    }

    const deleteItem = (id) => {
       const filterItems = items.filter((element) => {
            return element.id !== id
        })
        setItems(filterItems)
    }

    const removeItems = () => {
        setItems([])
    }

    // local storage setItem() to save my items
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items])


    return (
        <div className='container'>
            <div className="todoImage">
                <Zoom direction='right' delay='100'>
                    <TodoCalender/>
                </Zoom>
                <img src={headerImage} alt="header-pic" width='100%' height='150px' />              
            </div>
            <Fade delay='200'>
            <div className="todo_main">
                <span className='msg' ref={createRef}></span>
                <input type="text"
                    name='input'
                    placeholder='Adicionar itens'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className='todo-input' />

                {
                    toggleSubmit ?
                        <i className="fas fa-plus-circle todo-icons-add"
                            onClick={handleClick}
                            title='Add item'>
                        </i>
                        :
                        <i className="fas fa-edit todo-icons-edit"
                            onClick={handleClick}
                            title='Edit item'>
                        </i>
                }

                <div className="showItem">
                    {
                        items.map((item) => {
                            return (
                                <div className="todo-row">
                                    <h3>{item.text}</h3>
                                    <div className="icons_right">
                                        <i className="fa fa-edit icons" title='Edit Item' onClick={() => editItem(item.id)}></i>
                                        <i className="fa fa-trash-alt icons" title='Delete Item' onClick={() => deleteItem(item.id)}></i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="showItem">
                    <button className='todo-button' onClick={removeItems}>limpar tudo</button>
                </div>
            </div>
            </Fade>

        </div>

    )
}

export default TodoItems
