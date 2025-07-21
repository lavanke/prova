// Questions database
        const questions = [
                "Di che colore è una mela rossa? (rossa/blu/verde/gialla)",
                "primo bacino dove?",
                "Cos'è più pesante? 1000kg di piume o 1000kg di seta o 1000kg di sale",
                "Bau significa miao? (si/no)",
                "In che anno è scoppiata la WW1",
                "Da cosa è composto il guscio dell'uovo",
                "Il cielo è blu grazie al mare? (si/no)",
                "Quanto fa 2+2:2*2-2",
                "Qual'è il primo messaggio che ti ho inviato?",
                "I pesci spada respirano l'aria? (si/no)",
                "Quanti lati ha un triangolo? (attenta)",
                "Il contrario di si?",
                "Il fuoco brucia?",
                "Un toro femmina come si chiama?",
                "la scrofa maschio come si chiama?",
                "Quante ore ci sono in un giorno?",
                "Quanto mi ami da 1 a 10?",
                "Cos'è più grande un cornflakes o un mammut",
                "quanti bacini ti darei ora?",
                "Cosa succede se mangi una pianta? (ragiona)"
            ];

            

        // Answers database
        const answers = [
                "rossa", "al semaforo", "hanno lo stesso peso", "no", "1914", "calcio", "si", "2", "una foto", "si", 
                "3", "no", "si", "mucca", "maiale", "24", "10", "mammut", "troppi", "nulla"
            ];

        let currentQuestion = {};
        let score = 0;
        let questionsAnswered = 0;
        let username = "";
        let terminalState = "initial"; // initial, asking_name, test_in_progress, test_complete

        function updateClock() {
            const now = new Date();
            document.getElementById('time').textContent = now.toLocaleTimeString();
        }
        setInterval(updateClock, 1000);
        updateClock();

        function startTerminal() {
            const terminal = document.getElementById('terminal');
            terminal.innerHTML = `
                <div class="typewriter mb-4">
                    > AVVIANDO IL SISTEMA...<br>
                    > CARICANDO IL PROTOCOLLO...<br>
                    > CARICANDO IL BOOTLOAD...<br>
                    > SISTEMA PRONTO<br><br>
                </div>
                <div class="mb-2">
                    <span class="text-yellow-400">CIAO BIMBAAAA, BENVENUTA NEL MIO MONDO... CIRCA..</span><br>
                    FARAI UN QUIZ (CON ANCHE DOMANDE SU DI NOI!) (attenta a sbagliare o ti hackero) <br>
                    buona fortuna principessa
                </div>
                <div class="mt-4 text-green-300">
                    Digita <span class="text-yellow-400">'start'</span> per iniziare il test.
                </div>
            `;
            terminal.scrollTop = terminal.scrollHeight;
        }

        function handleCommand(e) {
            if (e.key === 'Enter') {
                submitCommand();
            }
        }

        function submitCommand() {
            const input = document.getElementById('commandInput');
            const command = input.value.trim();
            input.value = '';
            
            // Add command to terminal
            addToTerminal(`> ${command}`);
            
            // Process command
            switch(terminalState) {
                case "initial":
                    if (command.toLowerCase() === 'start') {
                        askForUsername();
                    } else if (command.toLowerCase() === 'help') {
                        showHelp();
                    } else {
                        addToTerminal('<span class="text-red-400">Comando non valido, digita \'start\' per iniziare o \'help\' per assitenza.</span>');
                    }
                    break;
                case "asking_name":
                    if (command.length > 0) {
                        username = command;
                        startTest();
                    } else {
                        addToTerminal('<span class="text-red-400">Inserisci un nome esistente</span>');
                    }
                    break;
                case "test_in_progress":
                    processAnswer(command);
                    break;
                case "test_complete":
                    if (command.toLowerCase() === 'restart') {
                        resetTest();
                    } else if (command.toLowerCase() === 'exit') {
                        addToTerminal('> Sto terminando la sessione....');
                        setTimeout(() => {
                            document.getElementById('terminal').innerHTML = '<div class="text-center py-4">SESSIONE TERMINATA</div>';
                        }, 1000);
                    } else {
                        addToTerminal('<span class="text-red-400">Digita \'restart\' per ricominciare oppure \'exit\' per uscire.</span>');
                    }
                    break;
            }
        }

        function addToTerminal(text) {
            const terminal = document.getElementById('terminal');
            const newLine = document.createElement('div');
            newLine.innerHTML = text;
            terminal.appendChild(newLine);
            terminal.scrollTop = terminal.scrollHeight;
        }

        function askForUsername() {
            terminalState = "asking_name";
            addToTerminal('<br><span class="text-yellow-400">Inserisci il tuo nome per iniziare il test:</span>');
        }

        function showHelp() {
            addToTerminal(`
                <br><span class="text-yellow-400">HELP MENU:</span><br>
                <span class="text-green-300">Comandi validi:</span><br>
                - start: Inizia il test<br>
                - help: Mostra questo menu<br><br>
                <span class="text-green-300">Test instructions:</span><br>
                - Rispondi ad ogni domanda<br>
                - Il tuo punteggio verrà calcolato alla fine<br>
                - Buona fortuna.... ne avrai bisogno.
            `);
        }

        function startTest() {
            terminalState = "test_in_progress";
            addToTerminal(`<br><span class="text-green-300">Benvenut*, ${username}.</span>`);
            addToTerminal('<span class="text-yellow-400">Il test sta iniziando... Preparati.</span><br>');
            askRandomQuestion();
        }

        function askRandomQuestion() {
            const randomIndex = Math.floor(Math.random() * questions.length);
            currentQuestion = {
                index: randomIndex,
                text: questions[randomIndex]
            };
            
            // Typewriter effect for question
            addToTerminal('<br>');
            const questionLine = document.createElement('div');
            questionLine.innerHTML = `<span class="text-cyan-300">${currentQuestion.text}</span>`;
            document.getElementById('terminal').appendChild(questionLine);
            terminal.scrollTop = terminal.scrollHeight;
        }

        function processAnswer(answer) {
            const correctAnswer = answers[currentQuestion.index].toString().toLowerCase();
            const userAnswer = answer.toString().toLowerCase();
            
            if (userAnswer === correctAnswer) {
                score++;
                addToTerminal('<span class="text-green-400">✓ Risposta corretta. Forse non sei una scemotta</span>');
            } else {
                addToTerminal(`<span class="text-red-400">✗ Risposta errata. La risposta era: ${correctAnswer}</span>`);
            }
            
            questionsAnswered++;
            
            // Remove asked question from pool
            questions.splice(currentQuestion.index, 1);
            answers.splice(currentQuestion.index, 1);
            
            if (questionsAnswered < 20 && questions.length > 0) {
                setTimeout(() => askRandomQuestion(), 1000);
            } else {
                finishTest();
            }
        }

        function finishTest() {
            terminalState = "test_complete";
            const percentage = Math.floor((score / questionsAnswered) * 100);
            
            let rating, ratingColor;
            if (percentage === 100) {
                rating = "Genia";
                ratingColor = "text-blue-400";
            } else if (percentage >= 80) {
                rating = "Intelligente";
                ratingColor = "text-green-400";
            } else if (percentage >= 50) {
                rating = "C'è di peggio";
                ratingColor = "text-yellow-400";
            } else if (percentage >= 20) {
                rating = "Porcoddio che schifo";
                ratingColor = "text-orange-400";
            } else {
                rating = "Livello adriano";
                ratingColor = "text-red-400";
            }
            
            addToTerminal(`
                <br><span class="text-yellow-400">TEST COMPLETATO</span><br>
                <span class="text-green-300">Il tuo punteggio finale ${username}:</span><br>
                - Domande corrette: <span class="text-green-400">${score} out of ${questionsAnswered}</span><br>
                - Percentuale di successo: <span class="text-green-400">${percentage}%</span><br>
                - IQ: <span class="${ratingColor} font-bold">${rating}</span><br><br>
                <span class="text-yellow-400">Digita 'restart' per ricominciare o 'exit' per uscire.</span>
            `);
        }

        function resetTest() {
            // Reset variables
            score = 0;
            questionsAnswered = 0;
            username = "";
            
            // Reset questions (since we removed them during testing)
            questions = [
                "Di che colore è una mela rossa? (rossa/blu/verde/gialla)",
                "primo bacino dove?",
                "Cos'è più pesante? 1000kg di piume o 1000kg di seta o 1000kg di sale",
                "Bau significa miao? (si/no)",
                "In che anno è scoppiata la WW1",
                "Da cosa è composto il guscio dell'uovo",
                "Il cielo è blu grazie al mare? (si/no)",
                "Quanto fa 2+2:2*2-2",
                "Qual'è il primo messaggio che ti ho inviato?",
                "I pesci spada respirano l'aria? (si/no)",
                "Quanti lati ha un triangolo? (attenta)",
                "Il contrario di si?",
                "Il fuoco brucia?",
                "Un toro femmina come si chiama?",
                "la scrofa maschio come si chiama?",
                "Quante ore ci sono in un giorno?",
                "Quanto mi ami da 1 a 10?",
                "Cos'è più grande un cornflakes o un mammut",
                "quanti bacini ti darei ora?",
                "Cosa succede se mangi una pianta? (ragiona)"
            ];
            
            answers = [
                "rossa", "al semaforo", "hanno lo stesso peso", "no", "1914", "calcio", "si", "2", "una foto", "si", 
                "3", "no", "si", "mucca", "maiale", "24", "10", "mammut", "troppi", "nulla"
            ];
            
            terminalState = "initial";
            document.getElementById('terminal').innerHTML = '';
            startTerminal();
        }