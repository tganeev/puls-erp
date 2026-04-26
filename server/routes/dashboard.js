const express = require('express');
const router = express.Router();

const dashboardData = {
    PROJECT_MANAGER: {
        stats: {
            activeObjects: 3,
            materialsInTransit: 125.5,
            monthProgress: 68,
            pendingApprovals: 4
        },
        chart: {
            labels: ['Нед 1', 'Нед 2', 'Нед 3', 'Нед 4'],
            plan: [85, 92, 88, 95],
            fact: [78, 85, 82, 88]
        },
        tasks: [
            { id: 1, title: 'Заказать бетон М300', priority: 'high', deadline: '2024-01-20', status: 'pending' },
            { id: 2, title: 'Проверить акты КС-2', priority: 'medium', deadline: '2024-01-18', status: 'in_progress' },
            { id: 3, title: 'Провести совещание с субподрядчиками', priority: 'high', deadline: '2024-01-19', status: 'pending' }
        ],
        recentActivities: [
            { id: 1, user: 'Петров А.', action: 'Создал заявку на материалы', time: '10:30', object: 'ЖК Созвездие' },
            { id: 2, user: 'Иванова Е.', action: 'Согласовал смету', time: '09:15', object: 'БЦ "Горизонт"' }
        ]
    },
    PTO_ENGINEER: {
        stats: {
            contracts: 12,
            estimates: 28,
            pendingDocs: 5,
            budgetProgress: 72
        },
        tasks: [
            { id: 1, title: 'Сформировать акт КС-2 по объекту "ЖК Созвездие"', priority: 'high', status: 'pending' },
            { id: 2, title: 'Обновить смету на СМР', priority: 'medium', status: 'in_progress' }
        ]
    },
    SUPPLY_ENGINEER: {
        stats: {
            activeOrders: 8,
            incomingMaterials: 3,
            pendingPayments: 5,
            warehouseFill: 45
        },
        tasks: [
            { id: 1, title: 'Согласовать счета от поставщиков', priority: 'high', status: 'pending' },
            { id: 2, title: 'Проверить остатки на складе', priority: 'medium', status: 'pending' }
        ]
    },
    DIRECTOR: {
        stats: {
            totalProjects: 7,
            activeProjects: 4,
            totalBudget: 325000000,
            avgProfitability: 18.5
        },
        tasks: [
            { id: 1, title: 'Утвердить бюджет на 2024 год', priority: 'high', status: 'pending' },
            { id: 2, title: 'Провести стратегическую сессию', priority: 'medium', status: 'pending' }
        ]
    }
};

router.get('/:role', (req, res) => {
    const { role } = req.params;
    const data = dashboardData[role] || dashboardData.PROJECT_MANAGER;
    res.json(data);
});

module.exports = router;