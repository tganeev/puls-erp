import React, { useState, useRef, useEffect } from 'react';
import { useAI } from '../contexts/AIContext';
import { useAuth } from '../contexts/AuthContext';
import './AIChat.css';

const AIChat = () => {
  const { user } = useAuth();
  const { messages, suggestions, loading, notifications, sendMessage } = useAI();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (inputMessage.trim()) {
      await sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getAIIcon = () => {
    const icons = {
      PROJECT_MANAGER: '🔧',
      PTO_ENGINEER: '📐',
      SUPPLY_ENGINEER: '📦',
      DIRECTOR: '📊'
    };
    return icons[user?.role] || '🤖';
  };

  const getAIName = () => {
    const names = {
      PROJECT_MANAGER: 'Ассистент прораба',
      PTO_ENGINEER: 'Помощник ПТО',
      SUPPLY_ENGINEER: 'Помощник снабженца',
      DIRECTOR: 'Стратегический аналитик'
    };
    return names[user?.role] || 'ИИ-ассистент';
  };

  if (!isOpen) {
    return (
      <button className="ai-chat-toggle" onClick={() => setIsOpen(true)}>
        <span className="ai-icon">{getAIIcon()}</span>
        <span className="ai-badge">AI</span>
      </button>
    );
  }

  return (
    <div className="ai-chat-window">
      <div className="ai-chat-header">
        <div className="ai-info">
          <span className="ai-icon-large">{getAIIcon()}</span>
          <div>
            <h3>{getAIName()}</h3>
            <p>Всегда онлайн</p>
          </div>
        </div>
        <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
      </div>

      <div className="ai-chat-tabs">
        <button className={`tab ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>
          Чат
        </button>
        <button className={`tab ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>
          Уведомления
          {notifications.length > 0 && <span className="tab-badge">{notifications.length}</span>}
        </button>
      </div>

      <div className="ai-chat-content">
        {activeTab === 'chat' && (
          <>
            <div className="messages-container">
              {messages.length === 0 && (
                <div className="welcome-message">
                  <p>👋 Привет! Я {getAIName().toLowerCase()}.</p>
                  <p>Чем могу помочь сегодня?</p>
                  <div className="example-questions">
                    <button onClick={() => sendMessage('Какие материалы нужно заказать?')}>
                      Какие материалы нужно заказать?
                    </button>
                    <button onClick={() => sendMessage('Сформировать акт КС-2')}>
                      Сформировать акт КС-2
                    </button>
                    <button onClick={() => sendMessage('Статус бюджета объекта')}>
                      Статус бюджета объекта
                    </button>
                  </div>
                </div>
              )}
              
              {messages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.sender}`}>
                  <div className="message-avatar">
                    {msg.sender === 'ai' ? getAIIcon() : '👤'}
                  </div>
                  <div className="message-content">
                    <div className="message-text">{msg.text}</div>
                    {msg.action && (
                      <button className="message-action" onClick={() => {
                        if (msg.action === 'generate_document') {
                          alert(`Генерация документа: ${msg.document || 'Акт'}`);
                        } else if (msg.action === 'create_request') {
                          alert('Создание заявки на материалы');
                        } else if (msg.action === 'create_task') {
                          alert('Создание задачи с высоким приоритетом');
                        }
                      }}>
                        {msg.action === 'generate_document' && '📄 Сформировать документ'}
                        {msg.action === 'create_request' && '📦 Создать заявку'}
                        {msg.action === 'create_task' && '✅ Создать задачу'}
                      </button>
                    )}
                    <div className="message-time">
                      {msg.timestamp?.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="message ai">
                  <div className="message-avatar">{getAIIcon()}</div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {suggestions.length > 0 && (
              <div className="suggestions">
                {suggestions.map((suggestion, idx) => (
                  <button key={idx} onClick={() => sendMessage(suggestion)}>
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <div className="input-area">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Напишите сообщение..."
                rows={1}
              />
              <button onClick={handleSend} disabled={loading || !inputMessage.trim()}>
                Отправить
              </button>
            </div>
          </>
        )}

        {activeTab === 'notifications' && (
          <div className="notifications-list">
            {notifications.length === 0 && (
              <div className="empty-notifications">
                <span>🔔</span>
                <p>Нет новых уведомлений</p>
              </div>
            )}
            {notifications.map(notif => (
              <div key={notif.id} className={`notification-item ${notif.type}`}>
                <div className="notification-icon">
                  {notif.type === 'warning' && '⚠️'}
                  {notif.type === 'info' && 'ℹ️'}
                  {notif.type === 'success' && '✅'}
                </div>
                <div className="notification-content">
                  <p>{notif.text}</p>
                  <span className="notification-time">{notif.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChat;