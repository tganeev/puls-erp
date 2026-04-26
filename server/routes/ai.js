const express = require('express');
const router = express.Router();

// ИИ-ассистент для разных ролей
const aiPrompts = {
    PROJECT_MANAGER: {
        name: 'Ассистент прораба',
        icon: '🔧',
        systemPrompt: 'Ты ассистент прораба на стройке. Помогаешь с заказом материалов, проверкой документов, контролем сроков.'
    },
    PTO_ENGINEER: {
        name: 'Помощник ПТО',
        icon: '📐',
        systemPrompt: 'Ты инженер ПТО. Помогаешь со сметами, договорами, актами КС-2, КС-3.'
    },
    SUPPLY_ENGINEER: {
        name: 'Помощник снабженца',
        icon: '📦',
        systemPrompt: 'Ты снабженец. Анализируешь заявки, счета, рекомендуешь лучшие предложения.'
    },
    DIRECTOR: {
        name: 'Стратегический аналитик',
        icon: '📊',
        systemPrompt: 'Ты стратегический аналитик. Формируешь сводные отчёты, анализируешь эффективность.'
    }
};

router.post('/chat', async (req, res) => {
    const { message, role, context } = req.body;
    
    const aiConfig = aiPrompts[role] || aiPrompts.PROJECT_MANAGER;
    
    // Имитация ИИ-ответа с реальными рекомендациями
    const getAIResponse = (userMessage, userRole, userContext) => {
        const msg = userMessage.toLowerCase();
        
        if (msg.includes('материал') || msg.includes('заказать')) {
            return {
                suggestions: ['Бетон М300', 'Арматура 12мм', 'Доска обрезная'],
                recommendation: `Рекомендую заказать материалы с учётом текущих остатков на складе. ${userRole === 'PROJECT_MANAGER' ? 'У вас заканчивается бетон на объекте "ЖК Созвездие"' : ''}`,
                action: 'create_request'
            };
        }
        
        if (msg.includes('акт') || msg.includes('кс-2')) {
            return {
                suggestions: ['Акт КС-2', 'Акт КС-3', 'Акт скрытых работ'],
                recommendation: 'Автоматически сформирован акт КС-2 за текущий период. Проверьте объёмы работ.',
                action: 'generate_document',
                document: 'ks2_2024_01.pdf'
            };
        }
        
        if (msg.includes('смета') || msg.includes('бюджет')) {
            return {
                suggestions: ['Смета на СМР', 'Бюджет объекта', 'План-факт анализ'],
                recommendation: 'Перерасход по статье "Материалы" составляет 15%. Рекомендую пересмотреть закупочные цены.',
                action: 'show_budget'
            };
        }
        
        if (msg.includes('срок') || msg.includes('отставание')) {
            return {
                suggestions: ['План работ', 'График производства', 'Протокол совещания'],
                recommendation: 'Выявлено отставание от графика по секции 2. Требуется усиление бригады или увеличение сменности.',
                action: 'create_task',
                priority: 'high'
            };
        }
        
        if (msg.includes('договор') || msg.includes('контрагент')) {
            return {
                suggestions: ['Типовой договор подряда', 'Договор поставки', 'Доп. соглашение'],
                recommendation: 'Договор с ООО "СтройРесурс" требует согласования. Отсутствуют сканы подписей.',
                action: 'review_contract'
            };
        }
        
        if (msg.includes('оплата') || msg.includes('деньги')) {
            return {
                suggestions: ['Заявка на оплату', 'Платёжный календарь', 'Акт сверки'],
                recommendation: 'По объекту "ТЦ Европа" просрочка оплаты от заказчика 15 дней. Рекомендую направить претензию.',
                action: 'check_payments'
            };
        }
        
        return {
            suggestions: ['Отчёт по объекту', 'Статус заявок', 'План на неделю'],
            recommendation: `Здравствуйте! Я ${aiConfig.name}, готов помочь вам с задачами. Что нужно сделать сегодня?`,
            action: null
        };
    };
    
    const response = getAIResponse(message, role, context);
    
    // Добавляем моковые уведомления ИИ
    const notifications = [
        { id: 1, type: 'warning', text: 'Заканчиваются материалы на объекте "ЖК Созвездие"', time: '5 мин назад' },
        { id: 2, type: 'info', text: 'Сформирован новый акт КС-2 для подписания', time: '1 час назад' },
        { id: 3, type: 'success', text: 'Заявка №124 согласована', time: '2 часа назад' }
    ];
    
    res.json({
        message: response.recommendation,
        suggestions: response.suggestions,
        action: response.action,
        document: response.document,
        priority: response.priority,
        notifications: notifications.slice(0, 3)
    });
});

router.post('/analyze', async (req, res) => {
    const { type, data } = req.body;
    
    if (type === 'budget') {
        res.json({
            analysis: 'Анализ бюджета выполнен',
            insights: [
                'Перерасход по материалам: +12%',
                'Экономия по ФОТ: -5%',
                'Риск превышения бюджета: средний'
            ],
            recommendations: [
                'Оптимизировать закупки арматуры',
                'Пересмотреть график работ',
                'Усилить контроль за сверхурочными'
            ]
        });
    } else if (type === 'requests') {
        res.json({
            analysis: 'Анализ закрытых заявок',
            closedRequests: 47,
            avgCost: 125000,
            topSuppliers: ['ООО "СтройРесурс"', 'ИП Иванов', 'ОАО "МеталлТорг"']
        });
    } else {
        res.json({ analysis: 'Анализ выполнен', data: data });
    }
});

module.exports = router;