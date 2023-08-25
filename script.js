const container = document.querySelector(".container"); 
const titule = document.querySelector(".titule"); 
const img_result = document.querySelector(".img_result"); 
const modal_result = document.querySelector(".modal_result"); 
const modal_info = document.querySelector(".modal_info"); 
const modal_form = document.querySelector(".modal_form"); 
const modal_historic = document.querySelector(".modal_historic"); 
const try_button = document.querySelector(".try_button"); 
const btn_save = document.querySelector(".btn_save"); 
const btn_delete = document.querySelector(".btn_delete"); 
const btn_close = document.querySelector(".btn_close"); 
const btn_score = document.querySelector(".btn_score"); 
const input = document.querySelector(".input"); 
const result = document.querySelector(".result"); 
const table = document.querySelector("table"); 
const msg_historic = document.querySelector(".msg_historic"); 
const tr = document.querySelector("tr"); 

const count = 20; 
let scoreQuest = []; 
let historic = []; 
let uniqValues = []; 
let name = ''; 
let alternative1; 
let alternative2; 
let alternative3; 
let alternative4; 

const getHistoric = async () => { 
    const key = Object.keys(localStorage); 
    if (key) { 
        key.findIndex((key) => { 
            const value = localStorage.getItem(key); 
            uniqValues.push({ key, value }); }); 
        } 
    } 
            
    getHistoric(); 
    const getListHistoric = () => { 
        modal_historic.style.display = 'flex'; 
        if (uniqValues.length === 0) { 
            tr.style.display = 'none'; 
            msg_historic.innerHTML = `sem histórico de sobrevivência, realize o questionário e sua pontuação aparecera aqui !`; 
            return; } 
            msg_historic.innerHTML = ''; 
            tr.style.display = 'flex'; 
            uniqValues.forEach((value) => { 
                const listHistoric = document.createElement("tr"); 
                const cardHistoric = ` <th>${value.key}</th> 
                <th>${value.value}%</th> 
                <th><i onclick="deleteItem('${value.key}')" class="bi bi-trash"></i></th>`; 
                
                listHistoric.innerHTML = cardHistoric; 
                table.appendChild(listHistoric); }) 
            } 

    input.addEventListener("input", () => { name = input.value; }); 

    input.addEventListener("keydown", (event) => { 
                if (event.key === 'Enter') { 
                    startQuiz(); } 
                }) 
    btn_save.addEventListener("click", () => { 
                    startQuiz(); 
                }); 
                
    btn_close.addEventListener("click", () => { 
                    modal_historic.style.display = 'none'; 
                    while (table.firstChild) { 
                        table.removeChild(table.firstChild); } 
                    }); 
                    
                    
    const startQuiz = () => { 
                        input.value = ''; 
                        modal_form.style.display = 'none'; 
                        container.style.display = 'flex'; 
                        btn_score.style.display = 'flex'; 
                        titule.innerHTML = `Olá ${name.toUpperCase()}!, você sobreviveria a um apocalipse zumbi ?`; 
                        countCards(); 
                    } 
    const deleteItem = (key) => { 
        const newArray = uniqValues.filter(item => item.key != key); 
        uniqValues = newArray; localStorage.removeItem(key); 
        
        while (table.firstChild) { 
            table.removeChild(table.firstChild); 
        } getListHistoric(); }; 
        
    try_button.addEventListener("click", () => { 
        while (container.firstChild) { 
            container.removeChild(container.firstChild); 
        } 
        modal_result.style.display = 'none'; 
        container.style.display = 'none'; 
        btn_score.style.display = 'none'; 
        modal_form.style.display = 'flex'; 
        scoreQuest = []; 
        getHistoric(); 
    }) 
    
    const countCards = async () => { 
        for (let i = 1; i <= count; i++) { 
            await questions(i); } 
        } 
        
    const questions = (id) => { 
        let quests = ''; 
        const quest_1 = { 
            quest: 'O que você é?', 
            img: 'image/quest1.jpeg', 
            answers1: { action: 'Inteligente', score: 4 }, 
            answers2: { action: 'Ansioso', score: 1 }, 
            answers3: { action: 'Medroso', score: 1 }, 
            answers4: { action: 'Valente', score: 3 }, 
        }; 
            
        const quest_2 = { 
            quest: 'Qual a sua principal habilidade?', 
            img: 'image/quest2.jpeg', 
            answers1: { action: 'Sobrevivência na natureza', score: 4 }, 
            answers2: { action: 'Conhecimento médicos', score: 3 }, 
            answers3: { action: 'Habilidades com armas', score: 5 }, 
            answers4: { action: 'Sem habilidades', score: 0 }, }; 
            
        const quest_3 = { 
            quest: 'Qual a sua idade?', 
            img: 'image/quest3.jpeg', 
            answers1: { action: '10 - 18 anos', score: 3 }, 
            answers2: { action: '19 - 29 anos', score: 4 }, 
            answers3: { action: '30 - 45 anos', score: 5 }, 
            answers4: { action: '45+', score: 3 }, 
        }; 
        
        const quest_4 = { 
            quest: 'Qual a sua reação ao ver um zumbi?', 
            img: 'image/quest4.jpeg', 
            answers1: { action: 'Correr', score: 3 }, 
            answers2: { action: 'Enfretar com um machado', score: 4 }, 
            answers3: { action: 'Enfretar com um porrete/pau', score: 1 }, 
            answers4: { action: 'procurar um grupo de sobreviventes', score: 2 }, 
        }; 
        
        const quest_5 = { 
            quest: 'Quanto Km/Metros você conseguiria correr sem parar caso necessário ?', 
            img: 'image/quest5.jpeg', 
            answers1: { action: '100 metros', score: 0 }, 
            answers2: { action: '500 metros', score: 1 }, 
            answers3: { action: '1 Km', score: 2 }, 
            answers4: { action: '3 Km', score: 5 }, 
        }; 
        
        const quest_6 = { 
            quest: `Você alguma habilidade com armas ?`, 
            img: 'image/quest6.jpeg', 
            answers1: { action: 'Armas brancas facas/machados/espadas', score: 4 }, 
            answers2: { action: 'Armas de fogo', score: 5 }, 
            answers3: { action: 'Apenas defesa pessoal', score: 3 }, 
            answers4: { action: 'Não tenho nenhuma habilidade com armas', score: 0 }, 
        }; 
        
        const quest_7 = { 
            quest: 'Como você planeja obter comida ?', 
            img: 'image/quest7.jpeg', 
            answers1: { action: 'Caçando', score: 5 }, 
            answers2: { action: 'Negocioar com outros sobreviventes ', score: 2 }, 
            answers3: { action: 'Invadir supermercados abondonados ', score: 3 }, 
            answers4: { action: 'Plantando', score: 3 }, 
        }; 
        
        const quest_8 = { 
           quest: 'Onde você se abrigaria?', 
           img: 'image/quest8.jpeg', 
           answers1: { action: 'Edificio na cidade', score: 2 }, 
           answers2: { action: 'Hospital', score: 1 }, 
           answers3: { action: 'Fazenda', score: 4 }, 
           answers4: { action: 'Floresta', score: 5 }, 
        }; 
        
        const quest_9 = { 
          quest: 'você está no centro da cidade onde o surto zumbie está começando, o que faria?', 
          img: 'image/quest9.jpeg', 
          answers1: { action: 'Tentaria se abrigar em uma delegacia', score: 4 }, 
          answers2: { action: 'Pegaria um tranporte público para chegar em casa o mais rápido ', score: 0 }, 
          answers3: { action: 'Iria correndo a pé', score: 1 }, 
          answers4: { action: 'Tentaria sair da cidade o mais rápido possível', score: 5 }, 
        }; 
        
        const quest_10 = { 
          quest: 'Qual a sua estratégia para se locomover?', 
          img: 'image/quest10.jpeg', 
          answers1: { action: 'Andar a pé ou de bicicleta para evitar chamar atenção', score: 3 }, 
          answers2: { action: 'Usar veículos', score: 5 }, 
          answers3: { action: 'Construir barricados para proteger áreas-chaves', score: 3 }, 
          answers4: { action: 'Usar túneis ou esgotos quando possíeveis', score: 2 }, 
    }; 
    
       const quest_11 = { 
         quest: 'Seu acampamento está sobre ataque de uma horda de zumbie o que você faria?', 
         img: 'image/quest11.jpeg', 
         answers1: { action: 'Fugiria', score: 3 }, 
         answers2: { action: 'Tentaria protege-lo', score: 2 }, 
         answers3: { action: 'Evacuaria os sobreviventes o mais rápido possivel', score: 3 }, 
         answers4: { action: 'Deixaria o acampamento e depois planejaria uma retomada', score: 5 }, 
        }; 
        
      const quest_12 = { 
        quest: 'Qual sua abordagem para lidar com outros sobreviventes?', 
        img: 'image/quest12.jpeg', 
        answers1: { action: 'Evitar contato', score: 3 }, 
        answers2: { action: 'Estabelecer aliaças', score: 5 }, 
        answers3: { action: 'Ser violento para demostrar força', score: 2 }, 
        answers4: { action: 'Roubar quando possíveis', score: 1 }, 
    }; 
    
     const quest_13 = { 
       quest: 'você está na cidade de Racoon City, após os eventos que leveram a sua destruição, qual esconderijo se abrigaria ?', 
       img: 'image/quest13.jpeg', 
       answers1: { action: 'Ficaria em topos de prédios', score: 5 }, 
       answers2: { action: 'Procuraria algum acentamento de sobreviventes para pedir abrigo', score: 2 }, 
       answers3: { action: 'Se abrigaria em supermercado/loja abondonado', score: 3 }, 
       answers4: { action: 'Ou em algum local subiterrânio', score: 1 }, 
    }; 
    
    const quest_14 = { 
        quest: `você está em navio com centenas de refugiados na Antártida, e um dos refugiado foi mordido e está espalhado o vírus pelo navio começando apenas pela 'Ala B', que você faria ?`, 
        img: 'image/quest14.jpeg', 
        answers1: { action: `Trancaria esse 'Ala B' mesmo ainda tendo outros sobreviventes não infectados nela`, score: 5 }, 
        answers2: { action: 'Fujiria com um bote salvas-vidas', score: 3 }, 
        answers3: { action: `Tentaria queimar a 'Ala B' do navio, enquanto os outros sobreviventes são evacuados`, score: 4 }, 
        answers4: { action: `Ou entaria na 'Ala B' , para tentar salvar os refugiados que não foram infectados`, score: 2 },
     }; 
     
     const quest_15 = { 
       quest: `você está com um grupo pequeno de sobreviventes incluindos crianças, vocês não comem faz 5 dias, que você faria ?`, 
       img: 'image/quest15.jpeg', 
       answers1: { action: `Capitura ratos para comer, mesmo sem saber se eles são portadores de doenças`, score: 3 }, 
       answers2: { action: 'Segue sem comerem nada', score: 2 }, 
       answers3: { action: 'Comeria seu cachorrinho, que sobreviveu com você até esse momento', score: 5 }, 
       answers4: { action: 'Ou comeria larvas e minhocas', score: 3 }, 
    }; 
    
    const quest_16 = { 
      quest: `Você está no universo de THE LAST OF US, e se encontrou com um 'Estalador', que você faria ?`, 
      img: 'image/quest16.jpeg', 
      answers1: { action: 'Ficaria imovél pelo tempo que conseguir, sem fazer barulho e rezar para ele não te ouvir', score: 2 }, 
      answers2: { action: 'Tentaria pegar algum objeto e jogar para um outro lado, para confudi-los e tentar correr', score: 5 }, 
      answers3: { action: 'Tentaria acertar com uma arma branca na cabeça do infectado', score: 1 }, 
      answers4: { action: 'Ou entraria em desespero, sem saber o que vai fazer', score: 0 },
     }; 
     
     const quest_17 = { 
      quest: 'você saiu para procurar mantimentos com um grupo pequeno e vocês dão de cara com uma mutação zumbi altamente resistente e perigoso, o que você faria ?', 
      img: 'image/quest17.jpeg', answers1: { action: 'Se organizariam para tentarem matar o zumbi', score: 5 }, 
      answers2: { action: 'Fujiria e cada um por si', score: 2 }, 
      answers3: { action: 'Ajudaria os mais fracos a fugir enquanto os mais fortes tentaria atrasa-lo ', score: 3 }, 
      answers4: { action: 'Ou funjiria com os mais fortes e deixaria os mais fracos por conta própia', score: 2 }, 
    }; 
    
    const quest_18 = { 
     quest: `Você está em uma cidade que já está tomanda com infectados, os governadores e comandantes da cidade
         já fecharam completamente todas as saídas e dentro 12 horas iram bombardear toda a cidade, o que faria ?`, 
     img: 'image/quest18.jpeg', 
     answers1: { action: 'Tentaria fungir pelos esgostos mesmo sabendo que lá também está lotado de infectados', score: 2 }, 
     answers2: { action: 'Tentaria se proteger nos Metros', score: 5 }, 
     answers3: { action: 'Tentaria gravar tudo e postar se possivel todo o ocorrido para não acontecer novamente', score: 1 }, 
     answers4: { action: 'Ou tentaria se abrigar em algum estacionamento subterrâneo', score: 3 }, 
    }; 
    
    const quest_19 = { 
     quest: `Um dos seu amigos sobreviventes foi mordido no braço, o que você faria ?`, 
     img: 'image/quest19.jpeg', 
     answers1: { action: 'Cortaria imediatamente o membro dele, mesmo sem saber se irar funcionar', score: 5 }, 
     answers2: { action: 'Não teria coragem e deixaria para ver o que acontecer', score: 1 }, 
     answers3: { action: 'deixaria ele se tranformar e depois daria um tiro de misericórdia', score: 3 }, 
     answers4: { action: 'Ou acabaria com o sofrimento dele na hora', score: 2 },
     }; 
     
     const quest_20 = { 
        quest: `Você está infectado, e descobre uma possivel cura, e ao chegar no laboratório ver que ele foi invadido, e o 'Químicio' que o criou está infectado, o que faria ?`, 
        img: 'image/quest20.jpeg', 
        answers1: { action: 'Pegaria a ultima dose para você', score: 5 }, 
        answers2: { action: 'Daria a ultima dose para o químico, para que ele possa replicar a cura', score: 1 }, 
        answers3: { action: `Tentaria dividir a dose para ambos, mesmo sabendo que poderiam morrer, pois a doce não está completa`, score: 2 }, 
        answers4: { action: 'Você cortaria seu membro infectado e daria a doce para o químico', score: 3 }, 
    }; 
    
    switch (id) { 
        case 1: quests = quest_1; break; 
        case 2: quests = quest_2; break; 
        case 3: quests = quest_3; break; 
        case 4: quests = quest_4; break; 
        case 5: quests = quest_5; break; 
        case 6: quests = quest_6; break; 
        case 7: quests = quest_7; break; 
        case 8: quests = quest_8; break; 
        case 9: quests = quest_9; break; 
        case 10: quests = quest_10; break; 
        case 11: quests = quest_11; break; 
        case 12: quests = quest_12; break; 
        case 13: quests = quest_13; break; 
        case 14: quests = quest_14; break; 
        case 15: quests = quest_15; break; 
        case 16: quests = quest_16; break; 
        case 17: quests = quest_17; break; 
        case 18: quests = quest_18; break; 
        case 19: quests = quest_19; break; 
        case 20: quests = quest_20; break; 
    } 
    return cardsQuest(quests, id) 
} 

const cardsQuest = async (quests, id) => { 
   const div = document.createElement("div"); div.classList.add("cards"); 
   const cards = ` <div id="${id}"> 
   <p>#${id}<p/> 
   <h4>${quests.quest}</h4> 
   <img src="${quests.img}"/> 
   <div class="buttons"> 
    <button onclick="score(${quests.answers1.score}, ${id})" class="quest_1">${quests.answers1.action}</button> 
    <button onclick="score(${quests.answers2.score}, ${id})" class="quest_2">${quests.answers2.action}</button> 
    <button onclick="score(${quests.answers3.score}, ${id})" class="quest_3">${quests.answers3.action}</button> 
    <button onclick="score(${quests.answers4.score}, ${id})" class="quest_4">${quests.answers4.action}</button> 
   </div> 
   </div>`; 

   div.innerHTML = cards; 
   container.appendChild(div); 
   const quest1 = await div.children[0].childNodes[7].children[0]; 
   await quest1?.addEventListener('click', (event) => { 
       var event = event?.currentTarget?.className; validQest(event); 
    }); 

    const quest2 = await div.children[0].childNodes[7].children[1]; 
    quest2?.addEventListener('click', (event) => { 
        var event = event?.currentTarget?.className; validQest(event); 
    }); 
    
    const quest3 = await div.children[0].childNodes[7].children[2]; 
    quest3?.addEventListener('click', (event) => { 
        var event = event?.currentTarget?.className; validQest(event); 
    }); 
    
    const quest4 = await div.children[0].childNodes[7].children[3]; 
    quest4?.addEventListener('click', (event) => { 
        var event = event?.currentTarget?.className; validQest(event); 
    }); 
    
    const validQest = (event) => { 
        switch (event) { 
        case "quest_1": quest1.style.backgroundColor = 'green'; 
          quest2.style.backgroundColor = 'rgb(187, 187, 210)'; 
          quest3.style.backgroundColor = 'rgb(187, 187, 210)'; 
          quest4.style.backgroundColor = 'rgb(187, 187, 210)'; break; 
        case "quest_2": 
          quest1.style.backgroundColor = 'rgb(187, 187, 210)'; 
          quest2.style.backgroundColor = 'green'; 
          quest3.style.backgroundColor = 'rgb(187, 187, 210)'; 
          quest4.style.backgroundColor = 'rgb(187, 187, 210)'; break; 
       case "quest_3": 
         quest1.style.backgroundColor = 'rgb(187, 187, 210)'; 
         quest2.style.backgroundColor = 'rgb(187, 187, 210)'; 
         quest3.style.backgroundColor = 'green'; 
         quest4.style.backgroundColor = 'rgb(187, 187, 210)'; break; 
       case "quest_4": quest1.style.backgroundColor = 'rgb(187, 187, 210)'; 
         quest2.style.backgroundColor = 'rgb(187, 187, 210)'; 
         quest3.style.backgroundColor = 'rgb(187, 187, 210)'; 
         quest4.style.backgroundColor = 'green'; break; }
         } 
        } 
        const score = (score, id) => {
             if (scoreQuest.length === 0) {
             scoreQuest.push({ id: id, score: score }); 
            } else { 
                const scoresQuests = scoreQuest.map(value => value.id); 
                for (const value of scoresQuests) { 
                    if (id === value) { 
                        const modify = scoreQuest.find(index => index.id === id); 
                        modify.score = score; return; 
                    } 
                } 
                scoreQuest.push({ id: id, score: score }); 
            } 
        } 
        
        const viewScore = () => { 
            const scores = scoreQuest.map(value => value.score); 
            const soma = scores.reduce((add, number) => add + number, 0); 
            modal_result.style.display = 'flex'; 

            if (soma >= 75) { 
                img_result.src = 'image/result2.jpeg'; 
                modal_info.style.background = 'linear-gradient(rgb(167, 200, 155), rgb(9, 121, 33))'; 
                result.innerHTML = `${name.toUpperCase()} a sua probabilidade de sobrevivência de ${soma}% está muito boa, continue assim! .`; } 
            else if (soma >= 50 && soma < 75) { 
                img_result.src = 'image/result1.jpeg'; 
                modal_info.style.background = 'linear-gradient(rgb(249, 206, 76), rgb(179, 145, 44))'; 
                result.innerHTML = `${name.toUpperCase()} a sua probabilidade de sobrevivência de ${soma}% está mediana, ainda não é o bastante se quiser durar muito.`; 
            } else if (soma < 50) { 
                img_result.src = 'image/result_0.jpeg'; 
                modal_info.style.background = 'linear-gradient(rgb(242, 83, 83), rgb(174, 48, 48))'; 
                result.innerHTML = `${name.toUpperCase()} a sua probabilidade de sobrevivência de ${soma}% está péssima, se continuar assim, você não vai durar nada.`; 
            }; 
                
                localStorage.setItem(`${name.split(' ')[0]}`, `${soma}`); 
            }
