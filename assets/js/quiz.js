document.addEventListener('DOMContentLoaded', function () {
    const questionnaireContainer = document.getElementById('questionnaire-container');

    // Define the questions and choices
    const questions = [
        {
            question: "What is the average age of your customer base?",
            choices: [
                { text: "~35 years", cluster: 0 },
                { text: "~44 years", cluster: 4 },
                { text: "~48 years", cluster: 3 },
                { text: "~56 years", cluster: 1 }
            ]
        },
        {
            question: "What is the income level of your customers?",
            choices: [
                { text: "<$30,000", cluster: 0 },
                { text: "~$40,000", cluster: 3 },
                { text: "~$44,000", cluster: 4 },
                { text: ">$65,000", cluster: 1 }
            ]
        },
        {
            question: "How many family members do your customers have?",
            choices: [
                { text: "Around 2 members", cluster: 2 },
                { text: "Around 2.5 members", cluster: 0 },
                { text: "Around 3 members", cluster: 1 },
                { text: ">3 members", cluster: 3 }
            ]
        },
        {
            question: "How frequently do your customers purchase?",
            choices: [
                { text: "Low frequency (~6 times per year)", cluster: 0 },
                { text: "Moderate frequency (~7-10 times per year)", cluster: 4 },
                { text: "High frequency (~10+ times per year)", cluster: 1 }
            ]
        },
        {
            question: "What is their average purchase amount?",
            choices: [
                { text: "Low (<$200)", cluster: 0 },
                { text: "Moderate ($200-$400)", cluster: 4 },
                { text: "High (>$1,000)", cluster: 1 }
            ]
        }
    ];

    const clusters = {
        0: "To drive engagement and boost spending among price-conscious customers, it's essential to highlight budget-friendly products and offer targeted promotions that cater to their needs. For example,consider offering discount bundles on frequently purchased items, such as a combination of vegetables and fish, or weekly deals on popular low-cost items like canned goods, dairy products, or frozen foods.",
        1: "Provide personalized offers and incentives to maintain high spending. One effective method is to analyze their past purchases and offer personalized discounts on the premium products they frequently buy. For example, if a customer regularly purchases high-end organic groceries or specialty wines, providing a discount on their favorite products or offering them an exclusive bundle of premium items",
        2: "Try to offer exclusive service or limited edition to this customer group. offering them an exclusive discount on luxury items, such as fine wines, organic produce, or high-end cosmetics, can reinforce their loyalty while encouraging continued spending. Special gift such as festivel card or birthday reward would also help to build the brand impact.",
        3: "Family discounts such as 'buy more, save more' deals on frequently purchased items like cereal, dairy products, or frozen meals encourage larger purchases and help families stock up. Offering multi-buy promotions, like 'buy two, get one free' on children's snacks or household cleaning supplies, can also increase customer loyalty and encourage repeat business.",
        4: "To attract cost-conscious customers and maximize the perceived value of their purchases, offering mid-tier product bundles or frequent promotions is an effective strategy. Mid-tier products, which offer a balance of quality and affordability, appeal to a wide range of consumers looking for the best value without sacrificing too much on quality. A personal care bundle featuring items like shampoo, conditioner, and body wash can cater to customers looking for quality but at a reasonable price."
    };

    let currentQuestion = 0;
    let clusterVotes = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };

    // Load the first question
    loadQuestion();

    // Function to load a question dynamically
    function loadQuestion() {
        if (currentQuestion < questions.length) {
            questionnaireContainer.innerHTML = `
                <h3>${questions[currentQuestion].question}</h3>
                <ul>
                    ${questions[currentQuestion].choices.map((choice, index) => `
                        <li>
                            <button onclick="selectAnswer(${index})">${choice.text}</button>
                        </li>`).join('')}
                </ul>
            `;
        } else {
            displayResult();
        }
    }

    // Handle the selection of an answer
    window.selectAnswer = function (choiceIndex) {
        const selectedChoice = questions[currentQuestion].choices[choiceIndex];
        clusterVotes[selectedChoice.cluster]++;
        currentQuestion++;
        loadQuestion();
    };

    // Display the result based on the answers
    function displayResult() {
        const mostVotedCluster = Object.keys(clusterVotes).reduce((a, b) => clusterVotes[a] > clusterVotes[b] ? a : b);
        questionnaireContainer.innerHTML = `
            <h3>Your Strategy Recommendation</h3>
            <p>${clusters[mostVotedCluster]}</p>
        `;
    }
});
