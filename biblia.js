/* Conteúdo da aba "Ler" do Pausa.
   Explicação de contexto (histórico, literário, de linguagem), não aplicação.
   Onde reformados e pentecostais divergem, as duas posições aparecem lado a lado.
   Texto bíblico não é copiado aqui: a leitura abre na Bíblia online (NAA) ou na Bíblia de papel. */
window.BIBLIA = {
  versao: { id: 1840, sigla: 'NAA' },

  livros: {
    MRK: 'Marcos', PHP: 'Filipenses', JAS: 'Tiago', '1JN': '1 João', GEN: 'Gênesis', RUT: 'Rute',
    JER: 'Jeremias', MAT: 'Mateus', ROM: 'Romanos', ISA: 'Isaías', ACT: 'Atos', '1CO': '1 Coríntios',
    EPH: 'Efésios', HEB: 'Hebreus', MAL: 'Malaquias', '3JN': '3 João', LUK: 'Lucas', JHN: 'João', '2CH': '2 Crônicas'
  },

  /* 48 leituras curtas (~5 min cada). Começa por Jesus, não por Gênesis 1. */
  plano: [].concat(
    Array.from({ length: 16 }, (_, i) => ['MRK', i + 1]),
    Array.from({ length: 4 }, (_, i) => ['PHP', i + 1]),
    Array.from({ length: 5 }, (_, i) => ['JAS', i + 1]),
    Array.from({ length: 5 }, (_, i) => ['1JN', i + 1]),
    Array.from({ length: 14 }, (_, i) => ['GEN', i + 37]),
    Array.from({ length: 4 }, (_, i) => ['RUT', i + 1])
  ),

  /* "Antes de ler": quem escreveu, para quem, quando e o que estava acontecendo. */
  intros: {
    MRK: [
      'Quem: João Marcos, segundo a tradição mais antiga (Papias, por volta de 120 d.C.), registrando a pregação de Pedro. É o Marcos que abandonou Paulo na primeira viagem (Atos 13:13) e depois voltou a ser útil (2 Timóteo 4:11).',
      'Quando: geralmente datado entre 55 e 70 d.C. Para a maioria dos estudiosos, é o primeiro evangelho escrito.',
      'Para quem: cristãos de fora da Judeia, provavelmente em Roma. Por isso ele explica costumes judeus (7:3-4) e traduz palavras em aramaico (5:41).',
      'Jeito do livro: o mais curto e o mais rápido. Usa muito a palavra "logo". Quase metade do livro é a última semana de Jesus.',
      'Repare: Jesus várias vezes manda não espalharem quem ele é. Na época, "Messias" soava como líder militar contra Roma, e ele não queria ser confundido com isso.'
    ],
    PHP: [
      'Quem: Paulo, preso, provavelmente em Roma, por volta de 60 a 62 d.C. Ele não sabe se vai ser solto ou executado (1:20-24).',
      'Para quem: a igreja de Filipos, a primeira fundada por Paulo na Europa (Atos 16: Lídia e o carcereiro).',
      'Filipos era colônia romana, cheia de ex-soldados, e a cidadania romana era motivo de orgulho. Isso pesa quando Paulo escreve "a nossa cidadania está nos céus" (3:20).',
      'A igreja tinha mandado ajuda para Paulo por meio de Epafrodito (4:18). A carta é em boa parte um agradecimento.',
      'Repare: as palavras "alegria" e "alegrar" aparecem várias vezes, escritas de dentro da prisão.'
    ],
    JAS: [
      'Quem: Tiago, irmão de Jesus (Gálatas 1:19). Durante o ministério de Jesus ele não acreditava nele (João 7:5); depois da ressurreição virou líder da igreja de Jerusalém (1 Coríntios 15:7; Atos 15).',
      'Quando: entre 45 e 62 d.C. Segundo o historiador Josefo, Tiago foi morto em 62.',
      'Para quem: "as doze tribos que andam dispersas", ou seja, cristãos de origem judaica espalhados fora de Israel, muitos pobres e explorados por ricos (5:1-6).',
      'Jeito do livro: parece Provérbios, com frases curtas de sabedoria, e tem muitos ecos do Sermão do Monte.'
    ],
    '1JN': [
      'Quem: atribuída ao apóstolo João, já idoso, por volta de 85 a 95 d.C., provavelmente em Éfeso.',
      'O que estava acontecendo: um grupo tinha saído da igreja (2:19) ensinando que Jesus não tinha vindo de verdade em carne (4:2-3), ideia que mais tarde viraria o gnosticismo.',
      'A carta dá sinais para reconhecer quem conhece a Deus: crer que Jesus veio em carne, obedecer e amar os irmãos.',
      'Objetivo declarado pelo próprio autor: "para que vocês saibam que têm a vida eterna" (5:13).'
    ],
    GEN: [
      'Esta parte (Gênesis 37 a 50) é a história de José, a última de Gênesis. A tradição judaica e cristã atribui o livro a Moisés.',
      'É uma história de família: o favoritismo de Jacó, a inveja dos irmãos, a traição, a escravidão, a prisão e a reconciliação.',
      'Tempo: José tinha 17 anos quando foi vendido (37:2) e 30 quando saiu da prisão (41:46), ou seja, cerca de 13 anos até a situação mudar.',
      'Repare: aqui Deus quase não fala diretamente, diferente das histórias de Abraão. Ele age por trás dos acontecimentos. Por isso esse é o texto clássico sobre providência.'
    ],
    RUT: [
      'Quando se passa: na época dos juízes (1:1), um período de caos moral em Israel (Juízes 21:25). O autor é desconhecido.',
      'Rute é moabita. Moabe era um povo inimigo de Israel (Deuteronômio 23:3), então uma estrangeira moabita como heroína era algo forte.',
      'Duas palavras-chave: "hesed", a lealdade ou amor fiel, e "goel", o parente resgatador, que tinha o dever de proteger a família e a terra de um parente (Levítico 25:25).',
      'O livro termina com uma genealogia que chega ao rei Davi (4:17-22), e Rute aparece na genealogia de Jesus (Mateus 1:5).'
    ]
  },

  /* Versículos muito citados que mudam de figura com o contexto.
     div: só existe quando reformados e pentecostais realmente divergem. */
  notas: [
    {
      cod: 'MRK', cap: 11, ref: 'Marcos 11:23-24', frase: 'Tudo o que pedirem em oração, creiam que já receberam',
      contexto: [
        'O versículo está no meio de um "sanduíche": Jesus amaldiçoa uma figueira sem fruto (11:12-14), expulsa os comerciantes do templo (11:15-17) e, no dia seguinte, os discípulos veem a figueira seca (11:20-21). A figueira funciona como sinal de juízo sobre um templo cheio de atividade e sem fruto.',
        'Alguns estudiosos notam que "este monte" pode apontar para o monte do templo, que estava à vista.',
        'A frase começa com "Tenham fé em Deus" (11:22), ou seja, fé em Deus, não fé na própria fé, e termina mandando perdoar antes de orar (11:25).'
      ],
      div: {
        ref: 'Os reformados enfatizam que a oração se submete à vontade de Deus ("se pedirmos alguma coisa segundo a sua vontade", 1 João 5:14) e leem o texto como confiança no poder de Deus, não como garantia de receber qualquer pedido.',
        pent: 'Os pentecostais clássicos enfatizam mais a fé que espera milagres de fato e oram com essa expectativa. Muitos líderes pentecostais clássicos, porém, criticam a "confissão positiva" ("declare e receba"), que vem do movimento da fé e do neopentecostalismo.',
        conc: 'A fé é em Deus. A frase não é uma fórmula para obrigar Deus.'
      }
    },
    {
      cod: 'MRK', cap: 16, ref: 'Marcos 16:17-18', frase: 'Estes sinais acompanharão aqueles que creem',
      contexto: [
        'Questão de manuscritos: o trecho 16:9-20 não aparece nos dois manuscritos completos mais antigos que temos, o Códice Sinaítico e o Códice Vaticano, ambos do século IV, mas aparece na maioria dos manuscritos posteriores. Por isso a NAA, a ARA e a NVI marcam esse trecho com colchetes ou nota.',
        'Sobre pegar serpentes: em Atos 28:3-6, uma cobra pica Paulo sem querer e ele não sofre nada. Foi um acidente, não um ritual.'
      ],
      div: {
        ref: 'Em geral, os reformados tratam 16:9-20 como provavelmente não original e não constroem doutrina sobre ele.',
        pent: 'Muitos pentecostais citam o trecho como base para os sinais hoje, como falar novas línguas e curar doentes. Estudiosos pentecostais também reconhecem a questão dos manuscritos e apoiam os dons sobretudo em Atos e 1 Coríntios.',
        conc: 'Nenhuma das duas alas ensina a pegar cobras ou beber veneno de propósito.'
      }
    },
    {
      cod: 'PHP', cap: 4, ref: 'Filipenses 4:13', frase: 'Tudo posso naquele que me fortalece',
      contexto: [
        'Os versículos 10 a 12 explicam o "tudo": Paulo aprendeu a viver contente tanto com fartura quanto com fome, tanto com sobra quanto com falta.',
        'Ele escreve isso preso. O assunto é aguentar qualquer situação, boa ou ruim, com a força de Cristo, e não conseguir qualquer meta.'
      ]
    },
    {
      cod: 'PHP', cap: 4, ref: 'Filipenses 4:6-7', frase: 'Não andem ansiosos por coisa nenhuma',
      contexto: [
        'Paulo escreve da prisão, sem saber se vai ser executado (1:20-23).',
        'Antes, nos versículos 4 e 5, vêm a alegria e o "perto está o Senhor". O texto não para no "não fiquem ansiosos": ele dá um caminho, que é orar com ações de graças, e a promessa é que a paz de Deus vai guardar o coração e a mente. Não promete que o problema vai sumir.',
        'Logo depois, no versículo 8, vem a orientação sobre aquilo em que pensar.'
      ]
    },
    {
      cod: 'JAS', cap: 5, ref: 'Tiago 5:14-15', frase: 'Alguém está doente? Chame os presbíteros da igreja',
      contexto: [
        'Os presbíteros eram os líderes da igreja local.',
        'Na época, o óleo era usado como remédio (Lucas 10:34) e também como sinal de consagração.',
        'Os versículos 15 e 16 ligam a cura à confissão de pecados com um "se": "se houver cometido pecados". Nem toda doença vem de pecado (João 9:1-3).'
      ],
      div: {
        ref: 'Os reformados oram pelos doentes. Alguns ungem com óleo e outros entendem o óleo como cuidado ou remédio. Eles enfatizam que a cura depende da vontade de Deus; por exemplo, Paulo deixou Trófimo doente (2 Timóteo 4:20).',
        pent: 'Para os pentecostais, a unção com óleo e a oração pela cura divina são práticas ativas e centrais, e a cura é esperada como parte do que Deus faz hoje.',
        conc: 'Chamar a liderança e orar pelos doentes é uma ordem bíblica para hoje.'
      }
    },
    {
      cod: '1JN', cap: 3, ref: '1 João 3:9', frase: 'Quem é nascido de Deus não vive na prática do pecado',
      contexto: [
        'A mesma carta diz, em 1:8-10, que quem afirma não ter pecado engana a si mesmo.',
        'O verbo grego está no presente contínuo e descreve uma prática habitual, um estilo de vida, e não nunca mais pecar. Por isso traduções como a ARA trazem "não vive na prática de pecado".'
      ]
    },
    {
      cod: 'GEN', cap: 50, ref: 'Gênesis 50:20', frase: 'Vocês planejaram o mal contra mim, mas Deus o tornou em bem',
      contexto: [
        'Jacó tinha acabado de morrer, e os irmãos de José temiam uma vingança (50:15-18).',
        'José chora e diz que não está no lugar de Deus (50:19). Ele não chama de bom o que os irmãos fizeram: diz claramente "vocês planejaram o mal".',
        'O bem que ele menciona é concreto: manter muita gente viva durante a fome.'
      ],
      div: {
        ref: 'Para os reformados, Deus decretou soberanamente até esses acontecimentos maus, sem ser autor do pecado. O mesmo evento tem duas intenções, a dos irmãos (má) e a de Deus (boa). Eles citam também 45:8: "não foram vocês que me enviaram para cá, mas Deus".',
        pent: 'Os pentecostais, na linha arminiana, entendem que Deus permitiu o mal que os irmãos escolheram livremente e o redirecionou para o bem.',
        conc: 'O mal continua sendo mal e responsabilidade de quem o fez. Deus não perde o controle da história.'
      }
    },
    {
      cod: 'RUT', cap: 1, ref: 'Rute 1:16', frase: 'Aonde você for, eu irei',
      contexto: [
        'Não é um casal falando. É Rute, a nora moabita e viúva, falando com a sogra Noemi, também viúva e sem filhos.',
        'Noemi manda as noras voltarem para suas famílias (1:8-13). Orfa volta e Rute fica.',
        'Rute muda de povo e de Deus ("o seu Deus será o meu Deus"), o que é uma conversão. O texto é muito usado em casamentos, mas fala de lealdade dentro da família (hesed).'
      ]
    },
    {
      cod: 'JER', cap: 29, ref: 'Jeremias 29:11', frase: 'Eu é que sei que pensamentos tenho a respeito de vocês',
      contexto: [
        'É uma carta de Jeremias aos judeus que já tinham sido levados para a Babilônia (29:1), por volta de 597 a.C.',
        'Falsos profetas prometiam uma volta rápida, em dois anos (Hananias, 28:2-4). Jeremias diz o contrário: construam casas, casem, plantem e busquem o bem da cidade onde estão (29:4-7), porque o exílio vai durar 70 anos (29:10).',
        'O "vocês" é plural: a promessa é ao povo como um todo e se cumpre depois de 70 anos, quando a maioria dos que ouviram a carta já teria morrido no exílio. O texto não diz que nada de ruim vai acontecer. Diz que Deus não abandonou o povo dentro de um sofrimento longo.'
      ]
    },
    {
      cod: 'MAT', cap: 7, ref: 'Mateus 7:1', frase: 'Não julguem, para que vocês não sejam julgados',
      contexto: [
        'Os versículos 3 a 5 completam a frase: tire primeiro a trave do seu olho, e então você vai enxergar para tirar o cisco do olho do seu irmão. O alvo é a hipocrisia e a condenação, não toda avaliação.',
        'No mesmo capítulo, Jesus manda discernir: não dar o que é santo aos cães (7:6) e reconhecer os falsos profetas pelos frutos (7:15-20).'
      ]
    },
    {
      cod: 'MAT', cap: 18, ref: 'Mateus 18:20', frase: 'Onde dois ou três estiverem reunidos em meu nome',
      contexto: [
        'Os versículos 15 a 20 tratam de disciplina na igreja: primeiro falar a sós com o irmão, depois com uma ou duas testemunhas e por fim levar à igreja.',
        '"Dois ou três" retoma a regra das testemunhas da Lei (Deuteronômio 19:15). Jesus garante sua presença e autoridade nessa decisão difícil.',
        'O texto não é principalmente sobre culto com pouca gente.'
      ]
    },
    {
      cod: 'MAT', cap: 16, ref: 'Mateus 16:19 e 18:18', frase: 'O que vocês ligarem na terra terá sido ligado nos céus',
      contexto: [
        '"Ligar e desligar" era uma expressão dos rabinos para proibir e permitir, isto é, decidir o que a Lei exige.',
        'Em 18:18, a frase está no contexto de disciplina na igreja (18:15-17).',
        'A forma do verbo grego pode ser traduzida como "terá sido ligado" (como na ARA): a igreja reconhece na terra o que Deus já decidiu.'
      ],
      div: {
        ref: 'Os reformados entendem as "chaves do reino" como a pregação do evangelho e a disciplina da igreja (Catecismo de Heidelberg, perguntas 83 a 85).',
        pent: 'Em muitos ambientes pentecostais e neopentecostais, o texto é usado na oração de batalha espiritual ("eu amarro o inimigo"). Estudiosos pentecostais também reconhecem o contexto de disciplina.',
        conc: 'Jesus deu autoridade real à igreja, e Cristo já venceu os poderes espirituais (Colossenses 2:15).'
      }
    },
    {
      cod: 'ROM', cap: 8, ref: 'Romanos 8:28', frase: 'Todas as coisas cooperam para o bem daqueles que amam a Deus',
      contexto: [
        'Romanos 8 é um capítulo sobre sofrimento: "os sofrimentos do tempo presente" (8:18), gemidos (8:22-23), perseguição e espada (8:35-36).',
        'O "bem" é definido no versículo seguinte: ser conformado à imagem de Cristo (8:29). Não significa necessariamente conforto.'
      ],
      div: {
        ref: 'Os versículos 29 e 30 ("conheceu de antemão, predestinou, chamou, justificou, glorificou") são centrais para os reformados. Para eles, "conheceu de antemão" significa amar e escolher pessoas de antemão: a eleição é incondicional, e todos os chamados nessa sequência chegam à glória.',
        pent: 'A maioria dos pentecostais clássicos, como a Assembleia de Deus, segue a linha arminiana: Deus previu quem iria crer e predestinou esses, e a eleição leva em conta a fé prevista.',
        conc: 'A salvação é pela graça, e Deus age a favor dos seus no meio do sofrimento.'
      }
    },
    {
      cod: 'ISA', cap: 53, ref: 'Isaías 53:5', frase: 'Pelas suas feridas fomos sarados',
      contexto: [
        'É o quarto "Cântico do Servo" (52:13 a 53:12). O vocabulário do capítulo gira em torno de transgressões, iniquidades e pecado (53:5-6, 8, 11-12).',
        'O Novo Testamento usa o texto de dois jeitos: Mateus 8:16-17 cita 53:4 a respeito das curas que Jesus fazia, e 1 Pedro 2:24 cita 53:5 a respeito do pecado ("para que, mortos para os pecados, vivamos para a justiça").'
      ],
      div: {
        ref: 'Para os reformados, a cruz garante a cura completa do corpo na ressurreição (Romanos 8:23). Hoje Deus pode curar, mas a cura física não é uma garantia da cruz para esta vida, e 1 Pedro 2:24 aplica o versículo ao pecado.',
        pent: 'Para os pentecostais clássicos, a cura divina foi provida na obra de Cristo; é uma das doutrinas marcantes do movimento (Jesus salva, batiza no Espírito, cura e volta). Por isso se pede cura com base na cruz, embora reconheçam que nem todos são curados agora.',
        conc: 'Deus cura hoje quando quer, e orar pelos doentes é bíblico (Tiago 5:14).'
      }
    },
    {
      cod: 'ACT', cap: 2, ref: 'Atos 2:4', frase: 'Todos ficaram cheios do Espírito Santo e passaram a falar em outras línguas',
      contexto: [
        'Pentecostes era uma festa judaica da colheita, 50 dias depois da Páscoa, e havia judeus de muitas nações em Jerusalém (2:5-11). Eles ouviram cada um na própria língua: eram idiomas humanos reconhecíveis.',
        'Pedro explica o que aconteceu com a profecia de Joel 2 (2:16-21).',
        'Em Atos o padrão varia: em Samaria, o Espírito vem depois do batismo (8:14-17); com Cornélio, antes do batismo e com línguas (10:44-46); em Éfeso, com a imposição de mãos (19:1-7).'
      ],
      div: {
        ref: 'Para os reformados, todo crente é batizado no Espírito na conversão (1 Coríntios 12:13). Atos descreve uma transição histórica única, com o evangelho chegando a judeus, samaritanos e gentios, e não um padrão de duas etapas. O que se repete é ser cheio do Espírito (Efésios 5:18).',
        pent: 'Para os pentecostais, o batismo no Espírito é uma experiência distinta da conversão e geralmente posterior a ela, dada para ter poder no testemunho (Atos 1:8), e a evidência inicial é falar em línguas. É a posição da Declaração de Fé da Assembleia de Deus.',
        conc: 'O Espírito habita em todo crente (Romanos 8:9), e é preciso viver cheio dele.'
      }
    },
    {
      cod: '1CO', cap: 13, ref: '1 Coríntios 13:8-10', frase: 'Quando vier o que é perfeito, o que é em parte será aniquilado',
      contexto: [
        'Os capítulos 12 a 14 corrigem uma igreja que usava os dons para se exibir. O capítulo 13, o "capítulo do amor", está no meio dessa discussão e não foi escrito pensando em casamento.'
      ],
      div: {
        ref: 'A maioria dos reformados históricos é cessacionista: os dons de revelação, como profecia e línguas, cessaram com os apóstolos e a Bíblia completa. Muitos deles admitem que "o perfeito" é a volta de Cristo e baseiam a cessação em outros textos (Efésios 2:20; Hebreus 2:3-4). Também há reformados continuístas, como o teólogo batista reformado Wayne Grudem.',
        pent: 'Os pentecostais são continuístas: "o perfeito" é a volta de Cristo ("face a face", 13:12), então todos os dons continuam até lá.',
        conc: 'O amor é maior que os dons, e os dons existem para edificar a igreja (14:12).'
      }
    },
    {
      cod: '1CO', cap: 14, ref: '1 Coríntios 14:2', frase: 'Quem fala em outra língua não fala a homens, mas a Deus',
      contexto: [
        'Aqui Paulo está limitando o uso de línguas no culto: sem intérprete, a pessoa deve ficar calada (14:27-28). Ele prefere a profecia porque ela edifica a igreja (14:1-5, 19).',
        'O capítulo termina com dois limites juntos: "não proíbam o falar em outras línguas" (14:39) e "tudo deve ser feito com decência e ordem" (14:40).'
      ],
      div: {
        ref: 'Para os reformados cessacionistas, as línguas eram idiomas reais (Atos 2), um sinal ligado à fundação da igreja, e cessaram.',
        pent: 'Para os pentecostais, além dos idiomas humanos, existe a língua como oração pessoal a Deus (14:2, 14), um dom para hoje.',
        conc: 'No culto, sem interpretação, não se deve falar em línguas em voz alta. Essa regra é do próprio texto (14:28).'
      }
    },
    {
      cod: 'EPH', cap: 2, ref: 'Efésios 2:8-9', frase: 'Pela graça vocês são salvos, mediante a fé',
      contexto: [
        'O trecho tem três partes: 2:1-3 (vocês estavam mortos em pecados), 2:4-7 (Deus deu vida) e 2:10 (criados para boas obras). A fé é o meio da salvação, e as obras são o resultado dela.',
        'No grego, o "isto não vem de vocês" está no gênero neutro, enquanto "graça" e "fé" são palavras femininas. Por isso muitos estudiosos entendem que o "isto" se refere ao pacote inteiro da salvação.'
      ],
      div: {
        ref: 'Para os reformados, a própria fé é um dom que Deus dá aos eleitos: Deus regenera e então a pessoa crê (monergismo). Eles incluem a fé dentro do "isto é dom de Deus".',
        pent: 'Na linha arminiana dos pentecostais, a graça de Deus capacita todos a crer (graça preveniente) e a pessoa responde livremente. O dom é a salvação; a fé é a resposta.',
        conc: 'A salvação não é por obras, e ninguém pode se gabar dela.'
      }
    },
    {
      cod: 'EPH', cap: 4, ref: 'Efésios 4:26', frase: 'Fiquem irados e não pequem',
      contexto: [
        'É uma citação do Salmo 4:4, na tradução grega usada na época.',
        'Está numa lista prática (4:25-32): falar a verdade, não deixar o sol se pôr sobre a ira, não dar lugar ao diabo (4:27), tirar a amargura e perdoar (4:31-32).',
        'O texto não manda ficar com raiva. Ele reconhece que a raiva acontece e põe limites de tempo ("o sol não se ponha") e de ação ("não pequem").'
      ]
    },
    {
      cod: 'HEB', cap: 6, ref: 'Hebreus 6:4-6', frase: 'É impossível que aqueles que caíram sejam outra vez renovados',
      contexto: [
        'Hebreus foi escrito a cristãos de origem judaica, tentados a voltar ao judaísmo para escapar da perseguição (10:32-34).',
        'A advertência é forte, mas o próprio autor diz logo depois: "quanto a vocês, estamos persuadidos de coisas melhores" (6:9).'
      ],
      div: {
        ref: 'Os reformados creem na perseverança dos santos: quem foi verdadeiramente regenerado não cai de forma definitiva (João 10:28-29; Filipenses 1:6). Hebreus 6 descreve pessoas que tiveram contato real com o evangelho sem serem regeneradas, ou é uma advertência que Deus usa justamente para manter os salvos firmes.',
        pent: 'Na linha arminiana, como a Assembleia de Deus, um crente verdadeiro pode, por escolha persistente, abandonar a fé e se perder (apostasia). Hebreus 6 descreve crentes verdadeiros.',
        conc: 'A advertência é séria, a segurança está em olhar para Cristo e não numa decisão do passado, e o fruto importa.'
      }
    },
    {
      cod: 'JHN', cap: 14, ref: 'João 14:12', frase: 'Fará obras maiores do que estas',
      contexto: [
        'É a noite antes da cruz (capítulos 13 a 17).',
        'O motivo vem na mesma frase: "porque eu vou para junto do Pai". As obras maiores estão ligadas à vinda do Espírito (14:16-17; 16:7) e são feitas por Cristo ("eu o farei", 14:13-14).'
      ],
      div: {
        ref: 'Para os reformados, as obras são "maiores" em alcance: o evangelho chegando a todas as nações e multidões sendo salvas depois de Pentecostes (3 mil pessoas em Atos 2), algo que Jesus não fez no ministério terreno.',
        pent: 'Para os pentecostais, as obras maiores incluem milagres e curas feitos pelos crentes hoje, em número maior porque eles são muitos.',
        conc: 'O poder vem de Cristo, não do crente.'
      }
    },
    {
      cod: 'MAL', cap: 3, ref: 'Malaquias 3:10', frase: 'Tragam todos os dízimos à casa do Tesouro',
      contexto: [
        'Época: por volta de 450 a 430 a.C., depois da volta do exílio, no tempo de Neemias. Em Neemias 13:10-12, os levitas tinham abandonado o templo porque não recebiam sustento.',
        'A "casa do Tesouro" eram os depósitos do templo, que sustentavam levitas, órfãos, viúvas e estrangeiros (Deuteronômio 14:28-29).',
        'A acusação é contra "a nação toda" (3:9), que também estava sendo acusada de divórcio e de casamentos com estrangeiros idólatras (2:10-16).',
        'O "ponham-me à prova" é uma exceção: em geral, a Bíblia proíbe testar Deus (Deuteronômio 6:16).',
        'Aqui a divisão não segue a linha reformados versus pentecostais. Nas duas alas há quem ensine o dízimo como obrigatório hoje e quem o ensine como princípio de generosidade na nova aliança (2 Coríntios 9:7). As duas alas tradicionais criticam a ideia de dízimo como investimento para enriquecer, que é típica da teologia da prosperidade (neopentecostal).'
      ]
    },
    {
      cod: '3JN', cap: 1, ref: '3 João 2', frase: 'Desejo que você tenha saúde e que tudo lhe corra bem',
      contexto: [
        'É uma carta pessoal curta, escrita a um amigo chamado Gaio.',
        'A frase segue a fórmula de saudação comum nas cartas gregas da época, que costumavam começar desejando saúde ao destinatário. É um desejo de saudação, não uma promessa.',
        'Reformados e pentecostais clássicos criticam o uso deste versículo como promessa de riqueza, que é típico da teologia da prosperidade.'
      ]
    },
    {
      cod: 'LUK', cap: 6, ref: 'Lucas 6:38', frase: 'Deem, e será dado a vocês',
      contexto: [
        'Os versículos 36 a 38 formam um bloco: sejam misericordiosos, não julguem, não condenem, perdoem, deem, porque "com a medida com que vocês medirem também vocês serão medidos".',
        'Antes, nos versículos 27 a 35, vêm amar os inimigos e emprestar sem esperar receber de volta. O assunto é misericórdia, perdão e generosidade com as pessoas, não especificamente oferta na igreja.',
        '"Medida recalcada, sacudida, transbordante, no colo" é uma imagem do comércio de grãos: a dobra da roupa servia de bolsa.'
      ]
    },
    {
      cod: '2CH', cap: 7, ref: '2 Crônicas 7:14', frase: 'Se o meu povo se humilhar... eu sararei a sua terra',
      contexto: [
        'É a resposta de Deus a Salomão na dedicação do templo, por volta de 960 a.C.',
        '"Meu povo, que se chama pelo meu nome" é Israel, e "sarar a terra" é algo concreto: o versículo anterior fala de seca, gafanhotos e peste (7:13).',
        'A promessa está ligada à aliança de Deus com Israel naquela terra. Hoje, as duas alas a aplicam como princípio, não como promessa direta a um país.'
      ]
    }
  ]
};
