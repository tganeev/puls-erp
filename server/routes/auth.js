const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Временное хранилище пользователей
const users = [
    {
        id: 1,
        email: 'prorab@puls.ru',
        password: '$2a$10$N9qo8uLOickgx2ZMRZoMy.MrJqGqgGqgGqgGqgGqgGqgGqgGqgG', // 123456
        name: 'Алексей Смирнов',
        role: 'PROJECT_MANAGER',
        avatar: 'https://ui-avatars.com/api/?background=0F2B4D&color=fff&name=Алексей+С'
    },
    {
        id: 2,
        email: 'pto@puls.ru',
        password: '$2a$10$N9qo8uLOickgx2ZMRZoMy.MrJqGqgGqgGqgGqgGqgGqgGqgGqgG',
        name: 'Екатерина Иванова',
        role: 'PTO_ENGINEER',
        avatar: 'https://ui-avatars.com/api/?background=0F2B4D&color=fff&name=Екатерина+И'
    },
    {
        id: 3,
        email: 'snab@puls.ru',
        password: '$2a$10$N9qo8uLOickgx2ZMRZoMy.MrJqGqgGqgGqgGqgGqgGqgGqgGqgG',
        name: 'Дмитрий Петров',
        role: 'SUPPLY_ENGINEER',
        avatar: 'https://ui-avatars.com/api/?background=0F2B4D&color=fff&name=Дмитрий+П'
    },
    {
        id: 4,
        email: 'director@puls.ru',
        password: '$2a$10$N9qo8uLOickgx2ZMRZoMy.MrJqGqgGqgGqgGqgGqgGqgGqgGqgG',
        name: 'Сергей Васильев',
        role: 'DIRECTOR',
        avatar: 'https://ui-avatars.com/api/?background=0F2B4D&color=fff&name=Сергей+В'
    }
];

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email);
    
    if (!user) {
        return res.status(401).json({ message: 'Неверный email или пароль' });
    }
    
    // В реальном проекте проверяйте пароль
    // const isValid = await bcrypt.compare(password, user.password);
    
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role, name: user.name },
        process.env.JWT_SECRET || 'secret_key',
        { expiresIn: '24h' }
    );
    
    res.json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar
        }
    });
});

router.post('/register', async (req, res) => {
    const { email, password, name, role } = req.body;
    
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'Пользователь уже существует' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id: users.length + 1,
        email,
        password: hashedPassword,
        name,
        role,
        avatar: `https://ui-avatars.com/api/?background=0F2B4D&color=fff&name=${encodeURIComponent(name)}`
    };
    
    users.push(newUser);
    
    const token = jwt.sign(
        { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
        process.env.JWT_SECRET || 'secret_key',
        { expiresIn: '24h' }
    );
    
    res.json({
        token,
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            avatar: newUser.avatar
        }
    });
});

module.exports = router;