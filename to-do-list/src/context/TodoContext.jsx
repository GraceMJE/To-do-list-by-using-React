import { Children, createContext, useState } from "react";

// 데이터를 담고 있음 => 아래 함수에 담긴 모든 값을 기억하는 context 변수
export const TodoContext = createContext();

// 전체를 감싸주는 우산!
export function TodoContextProvider({children}){
    // 투두리스트, 화면에 출력하는 (추가, 삭제, 수정)
    const [todos, setTodos] = useState([
        {id: 1, task: '투두 만들어보기'},
        {id: 2, task: '소리 바다'},
    ]);

    const [text, setText] = useState('');
    const [editingId, setEditingId] = useState('');
    const [editText, setEditText] = useState('');
    
    // 랜더링 방지
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    
    // 1.추가하기
    const addTodo = () => {
        if (text.trim().length === 0) {
        alert('할일을 입력해주세요 !');
        } else {
        const newId = todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1; 
        setTodos((prev) => [
            ...prev,
            {id: newId, task: text },
        ]);
        setText('');
        }
    };

    // 2.삭제하기
    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((item) => item.id !== id));
    };

    // 3. 수정하기 (핵심)
    const updateTodo = (id, text) => {
        setTodos((prev) =>
        prev.map((item) => item.id === id ? {...item, task:text}:item)
        );
        setEditingId('');
    };

    return <TodoContext.Provider value={{
        todos, setTodos,
        text, setText,
        editingId, setEditingId,
        editText, setEditText,
        handleSubmit,
        addTodo, deleteTodo, updateTodo,
    }}>{Children}</TodoContext.Provider>
}
