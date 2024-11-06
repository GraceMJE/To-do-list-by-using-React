import { useContext, useState } from 'react';
import './App.css';
import Input from './components/Input';
import Button from './components/Button';
import { TodoContext } from './context/TodoContext';

function App() {
  // TodoContext에서 할당된 변수 사용하기
  const {
    todos,
    text, setText,
    editingId, setEditingId,
    editText, setEditText,
    handleSubmit,
    addTodo, deleteTodo, updateTodo,
  } = useContext(TodoContext);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button className='.registerButton' onClick={addTodo} type='submit'>
            할 일 등록
          </Button>
      </form>
      <div>
        {todos.map((todo, _) => (
          <div style = {{ display: 'flex', gap: '20px'}}>
            {/* 수정이 아닐 때 */}
            {editingId !== todo.id && (
              <div key={todo.id} style={{display: 'flex', gap: '5px'}}>
                <p>{todo.id}.</p>
                <p>{todo.task}</p>
            </div>
            )}
            {/* 수정 중 상태일 때 */}
            {editingId === todo.id && (
              <div key={todo.id} style={{display: 'flex', gap: '5px'}}>
                <p>{todo.id}.</p>
                <Input 
                  defaultValue={todo.task} 
                  onChange={(e) => setEditText(e.target.value)}
                />
              </div>
            )}
            <Button className='deleteButton' onClick={() => deleteTodo(todo.id)}>삭제하기</Button>

            {/* editingId !== todo.id 수정이 아닌 상태 */}
            {/* editingId === todo.id 수정 중인 상태 */}
            {editingId === todo.id ? (
              <Button className='editCompleteButton' onClick={() => updateTodo(editingId, editText)}>수정 완료</Button>
            ) : (
              <Button className='editButton' onClick={() => setEditingId(todo.id)}>수정 진행</Button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}


export default App;