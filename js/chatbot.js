// chatbot.js - Floating Chatbot Logic

// Company Information
const companyInfo = {
    name: "Rise Capital Group",
    description: "We partner with accredited investors to deploy capital into real estate, oil & gas, and alternative real assets through structures designed for tax efficiency, downside protection, and long-term wealth creation.",
    philosophy: "We don't sell financial products. We co-invest, operate, and manage real assets alongside our partners with capital structures built to reward patience, discipline, and ownership.",
    companies: ["Energy Flex Fund", "Rise Equipment Partners", "Rise Natural Block Chain", "Rise Energy Group", "Texas Operating Partners", "Rise Drilling", "Safeguard", "South Texas Well Buyers"],
    whatWeDo: "We specialize in providing end-to-end energy solutions, from exploration and production to infrastructure development and resource optimization. By leveraging cutting-edge technology, data-driven insights, and industry-leading expertise, we maximize efficiency, enhance performance, and minimize environmental impact.",
    marketOverview: {
        oilGas: "Exclusive access to the largest wholesale companies provides direct access to deeply discounted opportunities without overhead.",
        realEstate: "We buy houses, not homes; buy when the market dips, sell when the market caps, hold the right properties. No emotional attachment.",
        strategicApproach: "Our data-driven approach identifies optimal investment opportunities through comprehensive market analysis and timing strategies.",
        sustainability: "Committed to responsible energy practices that minimize environmental impact while maximizing operational excellence."
    }
};

// Default responses for common queries
const defaultResponses = {
    "portfolio": "Your total portfolio value is $280.5M with an average return of 22.4%.",
    "investments": "You have 6 active funds including Rise Energy Fund I and GreenTech Ventures.",
    "funds": "Available funds include Rise Energy Fund I ($50M), GreenTech Ventures ($35M), and AI Innovation Fund ($75M).",
    "return": "Your current average return is 22.4%, which is 3.2% above benchmark.",
    "wallet": "Your wallet balance is $45,250. You have $45,250 available to invest.",
    "milestones": "Upcoming milestones include Regulatory Approval (May 20) and Project Launch (June 30).",
    "company": companyInfo.description + " " + companyInfo.philosophy,
    "what we do": companyInfo.whatWeDo,
    "companies": `Our companies include: ${companyInfo.companies.join(", ")}.`,
    "oil and gas": companyInfo.marketOverview.oilGas,
    "real estate": companyInfo.marketOverview.realEstate,
    "strategy": companyInfo.marketOverview.strategicApproach,
    "sustainability": companyInfo.marketOverview.sustainability,
    "help": "I can help you with: portfolio, funds, returns, wallet balance, milestones, company info, what we do, our companies, oil & gas, real estate, strategy, and sustainability.",
    "default": "I'm here to help with your Rise Capital investments. Ask me about portfolio, funds, company info, oil & gas, real estate, or our companies."
};

let currentDashboardType = 'shadcn';
let chatbotMessages = [];

function initChatbot(dashboardType) {
    currentDashboardType = dashboardType;
    
    // Clear existing messages
    chatbotMessages = [];
    const messagesContainer = document.getElementById('chatbot-messages');
    if (messagesContainer) {
        messagesContainer.innerHTML = '';
    }
    
    // Add welcome message - same for all dashboards
    addMessage("How can I help you?", 'bot');
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (!messagesContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'bot' ? '<i data-lucide="bot" style="width: 14px;"></i>' : '<i data-lucide="user" style="width: 14px;"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.innerHTML = text;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Store message
    chatbotMessages.push({ text, sender });
    
    // Re-render Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (!messagesContainer) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-avatar"><i data-lucide="bot" style="width: 14px;"></i></div>
        <div class="message-content">
            <div class="typing-indicator">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function removeTypingIndicator() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

function getResponse(userMessage) {
    const lowerMsg = userMessage.toLowerCase();
    
    // Check for keywords
    if (lowerMsg.includes('portfolio') || lowerMsg.includes('total value')) {
        return defaultResponses.portfolio;
    } else if (lowerMsg.includes('fund') || lowerMsg.includes('investment')) {
        return defaultResponses.investments;
    } else if (lowerMsg.includes('return') || lowerMsg.includes('irr')) {
        return defaultResponses.return;
    } else if (lowerMsg.includes('wallet') || lowerMsg.includes('balance')) {
        return defaultResponses.wallet;
    } else if (lowerMsg.includes('milestone') || lowerMsg.includes('upcoming')) {
        return defaultResponses.milestones;
    } else if (lowerMsg.includes('company') || lowerMsg.includes('about rise')) {
        return defaultResponses.company;
    } else if (lowerMsg.includes('what we do') || lowerMsg.includes('what do you do')) {
        return defaultResponses["what we do"];
    } else if (lowerMsg.includes('companies') || lowerMsg.includes('portfolio companies') || lowerMsg.includes('energy flex')) {
        return defaultResponses.companies;
    } else if (lowerMsg.includes('oil') || lowerMsg.includes('gas')) {
        return defaultResponses["oil and gas"];
    } else if (lowerMsg.includes('real estate') || lowerMsg.includes('property')) {
        return defaultResponses["real estate"];
    } else if (lowerMsg.includes('strategy') || lowerMsg.includes('approach')) {
        return defaultResponses.strategy;
    } else if (lowerMsg.includes('sustainability') || lowerMsg.includes('environment')) {
        return defaultResponses.sustainability;
    } else if (lowerMsg.includes('help') || lowerMsg.includes('what can you')) {
        return defaultResponses.help;
    } else {
        return defaultResponses.default;
    }
}

function sendMessage() {
    const input = document.getElementById('chatbot-input');
    if (!input) return;
    
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate bot thinking
    setTimeout(() => {
        removeTypingIndicator();
        const response = getResponse(message);
        addMessage(response, 'bot');
    }, 800);
}

function sendSuggestion(suggestion) {
    addMessage(suggestion, 'user');
    showTypingIndicator();
    setTimeout(() => {
        removeTypingIndicator();
        const response = getResponse(suggestion);
        addMessage(response, 'bot');
    }, 500);
}

function updateSuggestions() {
    // Common suggestions for all dashboards
    const commonSuggestions = ["My portfolio", "Company info", "What we do", "Oil & Gas", "Real Estate", "Our companies"];
    const container = document.getElementById('chatbot-suggestions');
    if (container) {
        container.innerHTML = commonSuggestions.map(s => `
            <button class="chatbot-suggestion" onclick="sendSuggestion('${s}')">${s}</button>
        `).join('');
    }
}

function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    if (!chatbotWindow) return;
    
    chatbotWindow.classList.toggle('open');
    if (chatbotWindow.classList.contains('open') && chatbotMessages.length === 0) {
        initChatbot(currentDashboardType);
        updateSuggestions();
    }
}

function closeChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    if (chatbotWindow) {
        chatbotWindow.classList.remove('open');
    }
}

// Handle Enter key
document.addEventListener('keypress', function(e) {
    const chatbotWindow = document.getElementById('chatbot-window');
    if (e.key === 'Enter' && chatbotWindow && chatbotWindow.classList.contains('open')) {
        const input = document.getElementById('chatbot-input');
        if (document.activeElement === input) {
            sendMessage();
        }
    }
});

// Update chatbot when dashboard changes (just reinitialize)
function updateChatbotDashboard(dashboardType) {
    currentDashboardType = dashboardType;
    // Clear messages and reinitialize
    const messagesContainer = document.getElementById('chatbot-messages');
    if (messagesContainer) {
        messagesContainer.innerHTML = '';
    }
    chatbotMessages = [];
    initChatbot(currentDashboardType);
    updateSuggestions();
}

// Make functions global
window.toggleChatbot = toggleChatbot;
window.closeChatbot = closeChatbot;
window.sendMessage = sendMessage;
window.sendSuggestion = sendSuggestion;
window.updateChatbotDashboard = updateChatbotDashboard;