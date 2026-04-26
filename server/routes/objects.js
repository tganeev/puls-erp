const express = require('express');
const router = express.Router();

const objects = [
    {
        id: 1,
        name: 'ЖК "Созвездие"',
        address: 'г. Москва, ул. Ленина, 15',
        customer: 'ООО "Группа Компаний"',
        status: 'IN_PROGRESS',
        progress: 65,
        startDate: '2023-06-01',
        endDate: '2024-12-31',
        budget: 125000000,
        actualCost: 81250000,
        manager: 'Алексей Смирнов',
        team: ['Иванов И.', 'Петров П.', 'Сидоров С.'],
        tasks: [
            { id: 1, title: 'Монтаж фундамента', status: 'completed', progress: 100 },
            { id: 2, title: 'Возведение стен', status: 'in_progress', progress: 70 },
            { id: 3, title: 'Кровельные работы', status: 'pending', progress: 0 }
        ]
    },
    {
        id: 2,
        name: 'БЦ "Горизонт"',
        address: 'г. Санкт-Петербург, Невский пр., 100',
        customer: 'ЗАО "Бизнес-Центр"',
        status: 'PLANNING',
        progress: 25,
        startDate: '2024-03-01',
        endDate: '2025-06-30',
        budget: 85000000,
        actualCost: 21250000,
        manager: 'Алексей Смирнов',
        team: ['Козлов К.', 'Морозов М.']
    },
    {
        id: 3,
        name: 'ТЦ "Европа"',
        address: 'г. Екатеринбург, ул. 8 Марта, 45',
        customer: 'ООО "Торговые площади"',
        status: 'COMPLETED',
        progress: 100,
        startDate: '2023-01-15',
        endDate: '2023-12-20',
        budget: 95000000,
        actualCost: 92150000,
        manager: 'Алексей Смирнов',
        team: ['Волков В.', 'Зайцев З.']
    }
];

router.get('/', (req, res) => {
    const { role } = req.query;
    let filteredObjects = objects;
    
    if (role === 'PROJECT_MANAGER') {
        filteredObjects = objects.filter(o => o.manager === 'Алексей Смирнов');
    }
    
    res.json(filteredObjects);
});

router.get('/:id', (req, res) => {
    const object = objects.find(o => o.id === parseInt(req.params.id));
    if (object) {
        res.json(object);
    } else {
        res.status(404).json({ message: 'Объект не найден' });
    }
});

router.post('/:id/tasks', (req, res) => {
    const object = objects.find(o => o.id === parseInt(req.params.id));
    if (object) {
        const newTask = {
            id: object.tasks.length + 1,
            ...req.body,
            status: 'pending',
            progress: 0
        };
        object.tasks.push(newTask);
        res.json(newTask);
    } else {
        res.status(404).json({ message: 'Объект не найден' });
    }
});

module.exports = router;