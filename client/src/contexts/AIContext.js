import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const AIContext = createContext();

export const useAI = () => useContext(AIContext);

const API_URL = 'http://localhost:5000/api';

export const AIProvider = ({ children }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const sendMessage = async (message, context = {}) => {
    if (!message.trim()) return;
    
    setLoading(true);
    setMessages(prev => [...prev, { text: message, sender: 'user', timestamp: new Date() }]);
    
    try {
      const response = await axios.post(`${API_URL}/ai/chat`, {
        message,
        role: user?.role,
        context
      });
      
      const aiResponse = response.data;
      
      setMessages(prev => [...prev, {
        text: aiResponse.message,
        sender: 'ai',
        timestamp: new Date(),
        action: aiResponse.action,
        document: aiResponse.document
      }]);
      
      setSuggestions(aiResponse.suggestions || []);
      
      if (aiResponse.notifications) {
        setNotifications(aiResponse.notifications);
      }
      
      return aiResponse;
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, {
        text: 'Извините, произошла ошибка. Попробуйте позже.',
        sender: 'ai',
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  const analyzeData = async (type, data) => {
    try {
      const response = await axios.post(`${API_URL}/ai/analyze`, { type, data });
      return response.data;
    } catch (error) {
      console.error('Analysis Error:', error);
      return null;
    }
  };

  return (
    <AIContext.Provider value={{
      messages,
      suggestions,
      loading,
      notifications,
      sendMessage,
      analyzeData
    }}>
      {children}
    </AIContext.Provider>
  );
};