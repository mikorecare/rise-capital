// offerings-data.js - Complete offerings list for Rise Capital

const offeringsData = {
    offerings: [
        // Development / Drilling Packages
        { id: 1, name: "Diversified Development Package 1", category: "Development", type: "Drilling Package", status: "Open", minInvestment: "$50,000", targetReturn: "24%", term: "24 months", location: "Permian Basin" },
        { id: 2, name: "Keeran 2", category: "Drilling", type: "New Drill", status: "Open", minInvestment: "$25,000", targetReturn: "28%", term: "18 months", location: "Keeran Field" },
        { id: 3, name: "Singer - Jordon", category: "Drilling", type: "New Drill", status: "Open", minInvestment: "$35,000", targetReturn: "26%", term: "20 months", location: "Singer Field" },
        { id: 4, name: "Gas Tycoons", category: "Natural Gas", type: "Fund", status: "Open", minInvestment: "$100,000", targetReturn: "18%", term: "36 months", location: "Multiple" },
        { id: 5, name: "Dinero", category: "Fund", type: "Private Equity", status: "Limited", minInvestment: "$250,000", targetReturn: "22%", term: "48 months", location: "Various" },
        { id: 6, name: "Rich Twin Sister", category: "Branded", type: "Special Offering", status: "Open", minInvestment: "$50,000", targetReturn: "30%", term: "24 months", location: "Permian" },
        { id: 7, name: "My First Wells 3", category: "Entry Level", type: "Starter Package", status: "Open", minInvestment: "$10,000", targetReturn: "20%", term: "12 months", location: "Various" },
        { id: 8, name: "CONCHO 3.0", category: "Development", type: "Field Development", status: "Open", minInvestment: "$75,000", targetReturn: "25%", term: "30 months", location: "Concho Field" },
        { id: 9, name: "Private Client", category: "Exclusive", type: "Private Offering", status: "By Invitation", minInvestment: "$500,000", targetReturn: "15%", term: "60 months", location: "Various" },
        { id: 10, name: "Rise Energy Group", category: "Fund", type: "Energy Fund", status: "Open", minInvestment: "$100,000", targetReturn: "20%", term: "48 months", location: "Multiple" },
        { id: 11, name: "Rise Equipment Partners 2", category: "Equipment", type: "Partnership", status: "Open", minInvestment: "$50,000", targetReturn: "16%", term: "36 months", location: "Nationwide" },
        { id: 12, name: "Energy Flex Fund 2024 K1", category: "Fund", type: "Flex Fund", status: "Open", minInvestment: "$25,000", targetReturn: "19%", term: "12 months", location: "Flexible" },
        { id: 13, name: "Doty Jackson - New Drill", category: "Drilling", type: "New Drill", status: "Open", minInvestment: "$40,000", targetReturn: "32%", term: "18 months", location: "Doty Jackson" },
        { id: 14, name: "Rise Natural Block Chain", category: "Innovation", type: "Blockchain Energy", status: "Coming Soon", minInvestment: "$25,000", targetReturn: "35%", term: "24 months", location: "Digital" },
        { id: 15, name: "RiseAir - Coming Soon!", category: "Innovation", type: "Air Rights", status: "Coming Soon", minInvestment: "TBD", targetReturn: "TBD", term: "TBD", location: "TBD" },
        { id: 16, name: "Behind Pipe Strike 2", category: "Production", type: "Behind Pipe", status: "Open", minInvestment: "$30,000", targetReturn: "22%", term: "24 months", location: "Existing Wells" },
        { id: 17, name: "Doty Jackson", category: "Production", type: "Producing Well", status: "Limited", minInvestment: "$50,000", targetReturn: "18%", term: "36 months", location: "Doty Jackson" },
        { id: 18, name: "Keeran 1", category: "Production", type: "Producing Well", status: "Closed", minInvestment: "$25,000", targetReturn: "16%", term: "24 months", location: "Keeran Field" },
        { id: 19, name: "CONCHO 2.0", category: "Development", type: "Field Development", status: "Limited", minInvestment: "$50,000", targetReturn: "22%", term: "24 months", location: "Concho Field" },
        { id: 20, name: "Singer", category: "Production", type: "Producing Well", status: "Open", minInvestment: "$35,000", targetReturn: "20%", term: "24 months", location: "Singer Field" },
        { id: 21, name: "RCG Equipment Partners I, LLC.", category: "Equipment", type: "Partnership", status: "Closed", minInvestment: "$100,000", targetReturn: "14%", term: "48 months", location: "Nationwide" },
        { id: 22, name: "Pixley - Natural Gas Rework", category: "Rework", type: "Workover", status: "Open", minInvestment: "$20,000", targetReturn: "25%", term: "12 months", location: "Pixley" },
        { id: 23, name: "Village Mills East", category: "Production", type: "Producing Field", status: "Open", minInvestment: "$45,000", targetReturn: "19%", term: "30 months", location: "Village Mills" },
        { id: 24, name: "NOGP Oklahoma Project 2", category: "Regional", type: "Oklahoma Project", status: "Open", minInvestment: "$60,000", targetReturn: "23%", term: "36 months", location: "Oklahoma" },
        { id: 25, name: "NOGP Oklahoma Project 1", category: "Regional", type: "Oklahoma Project", status: "Limited", minInvestment: "$50,000", targetReturn: "21%", term: "30 months", location: "Oklahoma" },
        { id: 26, name: "My First Wells Package 2", category: "Entry Level", type: "Starter Package", status: "Open", minInvestment: "$10,000", targetReturn: "18%", term: "12 months", location: "Various" },
        { id: 27, name: "My First Wells Package 1", category: "Entry Level", type: "Starter Package", status: "Closed", minInvestment: "$10,000", targetReturn: "17%", term: "12 months", location: "Various" },
        { id: 28, name: "Highland Heights", category: "Real Estate", type: "Property", status: "Open", minInvestment: "$75,000", targetReturn: "15%", term: "60 months", location: "Highland Heights" },
        { id: 29, name: "Eleanor & Saxon", category: "Production", type: "Well Package", status: "Open", minInvestment: "$40,000", targetReturn: "22%", term: "24 months", location: "Eleanor Field" },
        { id: 30, name: "Unallocated EFF", category: "Fund", type: "Flex Fund", status: "Open", minInvestment: "$25,000", targetReturn: "Variable", term: "Flexible", location: "Flexible" },
        { id: 31, name: "Concho Legacy Production Field", category: "Production", type: "Legacy Field", status: "Closed", minInvestment: "$100,000", targetReturn: "12%", term: "60 months", location: "Concho Field" },
        { id: 32, name: "Behind Pipe Strike 1", category: "Production", type: "Behind Pipe", status: "Closed", minInvestment: "$25,000", targetReturn: "20%", term: "24 months", location: "Existing Wells" },
        { id: 33, name: "Bullseye New Drill", category: "Drilling", type: "Exploration", status: "Open", minInvestment: "$60,000", targetReturn: "35%", term: "18 months", location: "Bullseye Prospect" },
        { id: 34, name: "Black Buck Sullivan F2", category: "Drilling", type: "Formation", status: "Open", minInvestment: "$55,000", targetReturn: "30%", term: "24 months", location: "Sullivan Field" },
        { id: 35, name: "Black Buck Sullivan F1", category: "Drilling", type: "Formation", status: "Limited", minInvestment: "$45,000", targetReturn: "28%", term: "24 months", location: "Sullivan Field" }
    ]
};