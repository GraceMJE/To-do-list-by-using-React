import { useState } from 'react';
import './App.css';
import Input from './components/Input';
import Button from './components/Button';

function App() {
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