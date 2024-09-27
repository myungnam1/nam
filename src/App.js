import {useEffect, useState} from "react";
import React from 'react';
import './App.css';

function App() {
  const [taskInput, setTaskInput] = useState('');
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  // 입력 필드 변경 시 실행되는 함수
  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  // Enter 키를 눌렀을 때 할 일 추가
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // 할 일을 추가하는 함수
  const addTask = () => {
    if (taskInput.trim() === '') {
      alert('할 일을 입력하세요!');
      return;
    }
    setPendingTasks([...pendingTasks, taskInput]);
    setTaskInput(''); // 입력 필드 초기화
  };

  // 완료된 항목으로 옮기는 함수
  const completeTask = (index) => {
    const taskToComplete = pendingTasks[index];
    setPendingTasks(pendingTasks.filter((_, i) => i !== index));
    setCompletedTasks([...completedTasks, taskToComplete]);
  };

  // 완료된 항목 삭제 함수
  const deleteTask = (index) => {
    setCompletedTasks(completedTasks.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <h1>UMC Study Plan</h1>
      <div className="input-container">
        <input
          type="text"
          value={taskInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress} // Enter 키 이벤트 핸들러
          placeholder="스터디 계획을 작성해보세요!"
        />
      </div>

      <div className="tasks-container">
        {/* 해야 할 일 목록 */}
        <div className="tasks pending-tasks">
          <h3>해야 할 일</h3>
          <ul>
            {pendingTasks.length === 0 ? (
              <li>할 일이 없습니다.</li>
            ) : (
              pendingTasks.map((task, index) => (
                <li key={index} className="task-item">
                  {task}
                  <button onClick={() => completeTask(index)}>완료</button>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* 해낸 일 목록 */}
        <div className="tasks completed-tasks">
          <h3>해낸 일</h3>
          <ul>
            {completedTasks.length === 0 ? (
              <li>아직 완료된 일이 없습니다.</li>
            ) : (
              completedTasks.map((task, index) => (
                <li key={index} className="task-item completed">
                  {task}
                  <button onClick={() => deleteTask(index)}>삭제</button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

//d