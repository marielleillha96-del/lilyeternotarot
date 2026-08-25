export type ServicePrice = {
  label: string;
  value: string;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  summary: string;
  details: string;
  includes: string[];
  prices: ServicePrice[];
  note?: string;
  featured?: string;
};

export type Testimonial = {
  id: string;
  title: string;
  image: string;
};

export const site = {
  name: 'ETERNO TAROT',
  shortName: 'Eterno Tarot',
  tagline: 'As respostas que você procura podem estar nas cartas.',
  description:
    'Landing page premium para o Eterno Tarot, com consultas online, leitura personalizada, foco em conversão e experiência mobile first.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  canonicalPath: '/',
  heroImage:
    '/lily.jpeg',
  heroSecondaryImage:
    'https://lh3.googleusercontent.com/LRNzI4GUF-F72C5s34T6b1VGf5YjhJYFTMz6Y8W14HAWgb_cy6eIisCThamRq3EMcVS5s09l2oaVDn9odYhxaU0HVClCWrd8Xg',
  aboutImage:
    'https://lh3.googleusercontent.com/teYWoZIiGBEvCBz4BBy1Z_4duFn8saw4tROtyJWaMZoVIih6TbhOx1jov6bWwuIsyzpOQwDiXuEDqq57HxVQ9dV_jNL6LhiRSQ',
  ctaImage:
    'https://lh3.googleusercontent.com/sBxRHZEsZ7HyaHXo7VziR5jIc-zuKgGkHa2iJ_5iBWV7k_9Bav7xwIex7IT-0T0UTT04J--8pDm67BkuPWnvX2ShJx5PjUHWmA',
  logoImage:
    'https://lh3.googleusercontent.com/LMY7gTBxBsJkLtpdrTPj2lMxNfQsCb3FTFH9UCqTBX7WSHBz4hVinaaQxnW-xBzuRobQ9NmYqlrWbkmyT9fzSOh3gynOKkdLmw',
  contact: {
    phone: '(11) 96120 8468',
    whatsapp: '(11) 96322 1753',
    whatsappLink: 'https://wa.me/5511963221753',
    email: '',
  },
  schedule: 'Ter a sex, das 16h às 21h',
  ethics:
    'Não tiro sobre gravidez, morte, saúde e traição. Tudo é conduzido com sigilo, respeito e ética do tarot.',
  socialNetworks: [
    {
      label: 'TikTok',
      url: 'https://www.tiktok.com/@eterno.tarot?_t=ZM-8tyf7rgG4cp&_r=1',
    },
  ],
  benefits: [
    'Atendimento confidencial',
    'Consulta online',
    'Leitura personalizada',
    'Entrega com fotos e áudios',
  ],
  services: [
    {
      id: 'perguntas-objetivas',
      slug: 'perguntas-objetivas',
      title: 'Perguntas objetivas',
      category: 'Direcionamento',
      image:
        'https://lh3.googleusercontent.com/vhaqau8CZlsh6qbCmcrjifnFsiik51zVwoN2KsOTUIEjkXCaQeWi5FRx2NbljNKVDXboiVT8sAE9cMMdufo-9aCrkxV9oUmmEg',
      summary:
        'Ideal para perguntas diretas, com leitura objetiva e foco em clareza. Não atende temas de morte, traição, saúde e gravidez.',
      details:
        'Leitura para questões bem definidas, com resposta focada no ponto central da dúvida. A consulta pode começar mesmo se você estiver offline e o retorno pode ser enviado em texto ou áudio, conforme a escolha do atendimento.',
      includes: [
        '1, 3, 5 ou 7 perguntas',
        'Resposta objetiva e focada',
        'Envio por áudio ou texto',
      ],
      prices: [
        { label: '1 pergunta', value: 'R$ 20,00' },
        { label: '3 perguntas', value: 'R$ 45,00' },
        { label: '5 perguntas', value: 'R$ 65,00' },
        { label: '7 perguntas', value: 'R$ 85,00' },
      ],
      note:
        'Tudo é confidencial e segue a ética do tarot.',
    },
    {
      id: 'amoroso',
      slug: 'amoroso',
      title: 'Amoroso',
      category: 'Amor',
      image:
        'https://lh3.googleusercontent.com/diNsdxkfvoWkBdZKh7ZmUlAdMnDWN-ArWnxzgJfvzytyrY69XYrEaGZT8u-ZMOAddMATn6pvB9VP4oAycwQ64kgxEToL-w_Q',
      summary:
        'Uma leitura completa sobre energia da conexão, sentimentos, intenções, obstáculos e perspectiva da relação.',
      details:
        'Traz a leitura da energia da conexão, o que a outra pessoa sente, o que pensa sobre você, intenções, obstáculos e tendência futura. Também permite adicionar ou alterar um tópico com acréscimo informado na origem.',
      includes: [
        'Energia da conexão',
        'Sentimentos e intenções',
        'Obstáculos e conselho',
      ],
      prices: [{ label: 'Valor', value: 'R$ 60,00' }],
    },
    {
      id: 'reconciliacao',
      slug: 'reconciliacao',
      title: 'Reconciliação',
      category: 'Amor',
      image:
        'https://lh3.googleusercontent.com/2QGJoibDK873uVPeqiPCxHWZYre1GnMqeeussBL5HEsgSgw1kwo84is5L4epLgwoK-5O1-_mtXLtiSh9kqyDpda5dxBIoy-kwA',
      summary:
        'Para entender saudade, vontade de voltar, mudanças de atitudes e a tendência futura da reconciliação.',
      details:
        'Consulta centrada na energia atual da conexão, no que a pessoa sente, no motivo do afastamento, na presença de saudade ou vontade de retorno, na tendência futura e no conselho final.',
      includes: ['Energia atual', 'Saudade e retorno', 'Conselho final'],
      prices: [{ label: 'Valor', value: 'R$ 50,00' }],
    },
    {
      id: 'raio-x-relacao',
      slug: 'raio-x-da-relacao',
      title: 'Raio-X da relação',
      category: 'Amor',
      image:
        'https://lh3.googleusercontent.com/-u3hed1ttHZAy0zTn9eU5YE-glzdcSPKdJs_qurVO7YR1tMxTG3kov-6PmPwOlvmKH2JfrxW6_QNsGT4CVY5ZG7LoeAT54P0ig',
      summary:
        'Mostra energia, comunicação, sentimentos, o que melhorar e para onde a relação pode ir.',
      details:
        'Uma leitura estruturada para observar energia, conexão, comunicação, sentimentos, pontos de melhoria, futuro e conselho. É uma boa escolha para quem quer enxergar a relação de forma prática e profunda.',
      includes: ['Energia e conexão', 'Comunicação e futuro', 'Conselho'],
      prices: [{ label: 'Valor', value: 'R$ 55,00' }],
    },
    {
      id: 'futuro-amoroso',
      slug: 'futuro-amoroso',
      title: 'Futuro Amoroso',
      category: 'Amor',
      image:
        'https://lh3.googleusercontent.com/GwnGHtfHE7sWSIZkTQcvrJyp9gxs_dFvEnYpMPrfAyvAnkorwOwFf_QhubukNIiQxuTSIrkOZQSqWaPRRx1gzKwVC5Jy7wdHqQ',
      summary:
        'Leitura sobre bloqueios, oportunidades, como atrair amor e quais conexões tendem a surgir.',
      details:
        'A tiragem mostra energia atual, o que bloqueia, oportunidades que se aproximam, o que fazer para atrair um amor alinhado, o tipo de conexão que pode aparecer e o conselho final.',
      includes: ['Bloqueios', 'Oportunidades', 'Conselho final'],
      prices: [{ label: 'Único', value: 'R$ 50,00' }],
    },
    {
      id: 'templo-afrodite',
      slug: 'templo-de-afrodite',
      title: 'Templo de Afrodite',
      category: 'Amor',
      image:
        'https://lh3.googleusercontent.com/yuZpmvy7pb-J70JuHNyca5dYv_vUXZ2-4MhkPmbS0dknex6A4H7dKzOaOU1g0mssG0xBBzkWJjooFuzE9Mhmc2hDTSUNWeOy',
      summary:
        'Leitura afetiva profunda para observar pensamentos, sentimentos, intenção, atração e centro da relação.',
      details:
        'A consulta avalia o seu lado e o da outra pessoa, com foco em pensamentos, sentimentos, intenção, atração, centro da conexão e conselho. É uma leitura mais analítica para refletir sobre o vínculo.',
      includes: ['Pensamentos e sentimentos', 'Intenção e atração', 'Conselho'],
      prices: [{ label: 'Valor', value: 'R$ 67,00' }],
    },
    {
      id: 'tiragem-ex',
      slug: 'tiragem-do-ex',
      title: 'Tiragem do ex',
      category: 'Amor',
      image:
        'https://lh3.googleusercontent.com/bynxP495rzLhvbj3kqGWpFoouZ3DURBX2nXqAW3qtg2h3uqTO9ogx_0AV52pbrccFa-NkEFSPoO8RLSbHOlpPm9cJLoKAXY2Qg',
      summary:
        'Para olhar sentimentos, intenções, possível futuro, mudanças de atitudes e conselho sobre um ex.',
      details:
        'Tiragem voltada a compreender o que a pessoa sente, quais são as intenções, o possível futuro, o que mudou nas atitudes e qual orientação seguir no momento.',
      includes: ['Sentimentos', 'Intenções', 'Possível futuro'],
      prices: [{ label: 'Único', value: 'R$ 45,00' }],
    },
    {
      id: 'analise-mes-geral',
      slug: 'analise-do-mes-geral',
      title: 'Análise do mês - geral',
      category: 'Ciclo',
      image:
        'https://lh3.googleusercontent.com/eP8ZHCPOq_BSkNxVjGcbpo4D9R8DpRF6yZQKNa8LmQmsOMSUyrD7oaTalSuxuny81_i-h4xhpXWWP5D1bfyDUTIV-YoO08iM8aI',
      summary:
        'Uma leitura mensal ampla sobre amor, família, finanças, espiritualidade, oportunidades e desafios.',
      details:
        'A tiragem percorre energia do mês, foco principal, como atrair energia positiva, espiritualidade, amor, família, finanças, oportunidades e conselho geral. É ideal para quem quer enxergar o período com mais clareza.',
      includes: ['Energia do mês', 'Vida afetiva e financeira', 'Conselho'],
      prices: [{ label: 'Valor 1', value: 'R$ 70,00' }],
    },
    {
      id: 'analise-geral',
      slug: 'analise-geral',
      title: 'Análise Geral',
      category: 'Geral',
      image:
        'https://lh3.googleusercontent.com/IzHzn-PxKkYTK5rBE2LPQFx4TPj33btKpcDzwItam7A8zktKfkwgn3hj5yzSZAEvY4myQ_gcknA7a4ochdb-H6il3LbTVLiLpQ',
      summary:
        'Leitura ampla sobre sua energia, finanças, afetos, família, espiritualidade, obstáculos e futuro.',
      details:
        'Consulta para observar a situação atual em vários campos da vida: financeiro, afetivo, família, espiritualidade, obstáculos, conselho e tendência futura.',
      includes: ['Campo pessoal', 'Campo financeiro', 'Tendência futura'],
      prices: [{ label: 'Valor', value: 'R$ 65,00' }],
    },
    {
      id: 'quem-eu-sou',
      slug: 'quem-eu-sou-autoconhecimento',
      title: 'Quem eu sou? Autoconhecimento',
      category: 'Autoconhecimento',
      image:
        'https://lh3.googleusercontent.com/L83_2TGyf-rA7KrAAtbd3o6poctpCZLYLcLF7fEjkNevdIgp5o1qzhE2d3Ero-bvWwoAzUHKP9tq9DJ735TXUKcoA01L7ZGS7ik',
      summary:
        'Para entender como você se vê, como é percebido, suas qualidades, pontos de melhora e aprendizados.',
      details:
        'A leitura investiga sua energia, imagem social, qualidades, o que precisa melhorar, o que precisa aprender sobre si e conselho final. Funciona como uma lente para reflexão e crescimento.',
      includes: ['Autoimagem', 'Qualidades e melhorias', 'Conselho'],
      prices: [{ label: 'Valor', value: 'R$ 50,00' }],
    },
    {
      id: 'raizes-autoconhecimento',
      slug: 'raizes-autoconhecimento',
      title: 'Raízes - Autoconhecimento',
      category: 'Autoconhecimento',
      image:
        'https://lh3.googleusercontent.com/fCkvoer2dv5OvibKNNVV3HLpCVOoL-BAJV8SAKadX1HwCrhxVCiNRVkVgIaEQU8Hv1q5vheTJ94TBAYhRQHJqdKoNcQeMtH2eA',
      summary:
        'Uma leitura sobre dificuldades, fortalecimento das qualidades e expansão pessoal.',
      details:
        'Mostra as maiores dificuldades, como melhorar esses pontos, quais qualidades estão presentes e como ampliar esses atributos para trazer mais propósito e equilíbrio.',
      includes: ['Dificuldades', 'Qualidades', 'Ampliação pessoal'],
      prices: [{ label: 'Valor', value: 'R$ 55,00' }],
    },
    {
      id: 'autoconhecimento-personalizado',
      slug: 'autoconhecimento-personalizado',
      title: 'Autoconhecimento Personalizado',
      category: 'Autoconhecimento',
      image:
        'https://lh3.googleusercontent.com/VqaWvSC4KJKRfyCLz71XUx_EShEIe_1U1rlCKFeaDAjz-TSAlqGkiOig2EaYgdLmtAlKZgLMIir3mu7DKUArbEiEgzoiE9FA',
      summary:
        'Você pode trazer até 5 tópicos ou explicar o que mais está te mexendo para montar a tiragem.',
      details:
        'Consulta flexível, pensada para quem quer aprofundar temas específicos de forma mais livre. Permite até 5 tópicos ou um contexto mais amplo para orientar a construção da leitura.',
      includes: ['Até 5 tópicos', 'Leitura sob medida', 'Contexto livre'],
      prices: [{ label: 'Valor', value: 'R$ 55,00' }],
    },
    {
      id: 'voz-do-invisivel',
      slug: 'a-voz-do-invisivel-espiritual',
      title: 'A voz do invisível (Espiritual)',
      category: 'Espiritual',
      image:
        'https://lh3.googleusercontent.com/J9b4kSDFips0fAh33OGg9jPwME9XBQCcWzWmJHtAxcBsxlbEXGE_6uMW0A1YDbDk_ePG0E8iKraGW4x-zeVzCCxxbQL-EwgRnw',
      summary:
        'Leitura espiritual sobre energia atual, mensagem da espiritualidade, bloqueios e próximos passos da alma.',
      details:
        'Avalia a energia espiritual neste momento, o que a espiritualidade quer mostrar, os bloqueios no fluxo, o centro da tiragem, como se abrir para receber a mensagem, a prática que favorece agora e o próximo passo da alma.',
      includes: ['Energia espiritual', 'Mensagem canalizada', 'Conselho'],
      prices: [{ label: 'Único', value: 'R$ 65,00' }],
    },
    {
      id: 'minha-intuicao',
      slug: 'minha-intuicao',
      title: 'Minha intuição',
      category: 'Espiritual',
      image:
        'https://lh3.googleusercontent.com/MjgwblmLOBjuocRRDvkqSEwS7U3VOuQtqtJoflpJ0InfYlXEwjN7xypX5lUDYMS_62n8ao28BOlITZW5QpNeZBaf-TH-VSDnXQ',
      summary:
        'Mostra como está sua intuição, o que bloqueia, quais pontos fortes e como fortalecê-la.',
      details:
        'Leitura para compreender a relação com a própria intuição, identificar bloqueios, reconhecer habilidades intuitivas, encontrar práticas de fortalecimento e receber uma mensagem final.',
      includes: ['Bloqueios intuitivos', 'Pontos fortes', 'Mensagem final'],
      prices: [{ label: 'Valor', value: 'R$ 47,00' }],
    },
    {
      id: 'limpeza-energetica',
      slug: 'limpeza-energetica',
      title: 'Limpeza Energética',
      category: 'Espiritual',
      image:
        'https://lh3.googleusercontent.com/RDWOeLa9RdQKNApenZQeAlMs0yM5Y7Dwnm8yhUCHb9KspZII6pM4HFRbx2d-fulsOw_REKRVCxlWbbUH-2RlNlyUertXGOpr',
      summary:
        'Leitura sobre energia atual, fontes de desgaste, o que liberar e como restaurar o equilíbrio.',
      details:
        'A consulta identifica o estado energético, os desgastes, o que precisa ser liberado, como restaurar o equilíbrio e qual conselho favorece bem-estar e estabilidade.',
      includes: ['Estado energético', 'Desgaste e liberação', 'Equilíbrio'],
      prices: [{ label: 'Valor', value: 'R$ 47,00' }],
    },
    {
      id: 'profissional',
      slug: 'profissional',
      title: 'Profissional',
      category: 'Carreira',
      image:
        'https://lh3.googleusercontent.com/4coWBc82ScS1jIDpzMJPoxYSPhYvqYzj8eWaIWN6cU6QiYEu6YjqmNvjOJe22yFeZ7B5GsRhxOXXbV5Fnl72MJ_QE9J6mS5S',
      summary:
        'Mostra energia para trabalho, bloqueios, melhor atitude e tendência para os próximos meses.',
      details:
        'Leitura centrada na sua situação em relação ao emprego, bloqueios e desafios, melhor atitude a tomar, perspectiva futura e conselho.',
      includes: ['Situação atual', 'Bloqueios e atitude', 'Perspectiva futura'],
      prices: [{ label: 'Valor', value: 'R$ 50,00' }],
    },
    {
      id: 'financeiro',
      slug: 'financeiro',
      title: 'Financeiro',
      category: 'Carreira',
      image:
        'https://lh3.googleusercontent.com/PQ9QH_BwbCm4vXTDQuqIjl-J84uGk_XuqSYsyeBXq01o2YNzOWr6Ob8H57znAkK8ZwGPbiFWzW0qqArhEK8Dl61UCVHWyQaQZQ',
      summary:
        'Uma leitura para entender fluxo de dinheiro, bloqueios, oportunidades e atitudes para prosperar.',
      details:
        'Analisa a situação financeira atual, a fonte do bloqueio, oportunidade próxima, atitude para destravar a abundância e tendência financeira para os próximos meses.',
      includes: ['Fluxo financeiro', 'Bloqueio e oportunidade', 'Tendência'],
      prices: [{ label: 'Único', value: 'R$ 54,00' }],
    },
    {
      id: 'ambiente-profissional',
      slug: 'meu-ambiente-profissional',
      title: 'Meu ambiente Profissional',
      category: 'Carreira',
      image:
        'https://lh3.googleusercontent.com/NKaqXLG37mQUtvAg41-ngNBl4K0jcKGgQphQrrujVsj0X7azlk5e02LhIPT2YikA4_vNHIrlc3NtloDBwB4Q_IbP5kKK8pqarw',
      summary:
        'Leitura sobre como a empresa te percebe, suas forças, desafios e oportunidades de crescimento.',
      details:
        'Observa o momento da empresa, a imagem que você transmite, seus pontos fortes, os desafios, as oportunidades, como se destacar, o que merece atenção e a tendência de permanência.',
      includes: ['Ambiente de trabalho', 'Pontos fortes', 'Conselho'],
      prices: [{ label: 'Valor', value: 'R$ 60,00' }],
    },
    {
      id: 'novo-caminho-profissional',
      slug: 'novo-caminho-profissional',
      title: 'Novo caminho profissional',
      category: 'Carreira',
      image:
        'https://lh3.googleusercontent.com/FGzddUCRh1AtqGHH5SLwLxSn4ZFmZcEQQzcEalhxJ6azAaIZ8-JgnYYQTbEUlzM-JHCZWkTpwo4v99kQDbOQv403wM_XNXZsET0',
      summary:
        'Para quem busca emprego ou mudança de rota, com foco em ação e oportunidade.',
      details:
        'Mostra sua energia em relação à busca, obstáculos, potencial, como agir, caminhos mais favoráveis e conselho para a jornada profissional.',
      includes: ['Busca ativa', 'Oportunidades', 'Conselho'],
      prices: [{ label: 'Valor', value: 'R$ 55,00' }],
    },
    {
      id: 'roda-do-ano',
      slug: 'roda-do-ano',
      title: 'Roda do Ano',
      category: 'Ciclo',
      image:
        'https://lh3.googleusercontent.com/6kYdgQAW_SRcKLmPQef4b78RobAzfuXZCvQPvrffswfd1KuXvBP6mda_mAl38wV7a1EB9O5QB3caW0B19rnXovSk6mmnJ_Stkw',
      summary:
        'Uma visão anual com 13 posições sobre vida pessoal, carreira, finanças, relações, saúde e espiritualidade.',
      details:
        'Abrange o período do mês da tiragem até o próximo ano, com centro da roda, energia geral, trabalho, finanças, amor, família, amizades, saúde física, saúde emocional, espiritualidade, projetos, desafios e oportunidades.',
      includes: ['Visão anual', '13 posições', 'Conselho e alerta'],
      prices: [{ label: 'Único', value: 'R$ 170,00' }],
    },
    {
      id: 'mesa-autoconhecimento-profundo',
      slug: 'mesa-de-autoconhecimento-profundo',
      title: 'Mesa de autoconhecimento profundo',
      category: 'Autoconhecimento',
      image:
        'https://lh3.googleusercontent.com/zLqJHjjp6sp-lsN3vhpzyo-cKa4CtQcTP0f9amS-N7NO1tn5TfP4bYDGix8StREGUyro1_mLRO8K1uNXamk4jmdF2kIWsm7rHpA',
      summary:
        'Leitura mais profunda sobre essência, máscara, sombra, feridas, potencial e caminho de crescimento.',
      details:
        'Consulta extensa para aprofundar autoconhecimento e perceber aspectos que muitas vezes ficam escondidos. É voltada para reflexão, crescimento e reorganização interna.',
      includes: ['Essência e sombra', 'Feridas e desejo', 'Caminho de crescimento'],
      prices: [{ label: 'Valor', value: 'R$ 185,00' }],
    },
    {
      id: 'mesa-completa',
      slug: 'mesa-completa',
      title: 'Mesa Completa',
      category: 'Completa',
      image:
        'https://lh3.googleusercontent.com/EhyhwvjaoCIz_rMX4mzxlNedb54naX6mVJseYT49B5mu18wpUUxy5PeY2OI804urTT4OYF9qrQgFwsrBHy78WtJc_Xj32XoJ',
      summary:
        'Leitura ampla com campos pessoal, profissional, financeiro, saúde, relacionamentos, família e espiritualidade.',
      details:
        'A tiragem completa reúne sete grandes campos para observar o momento atual, entender desafios e encontrar orientações mais amplas. A parte da saúde é tratada de forma espiritual e não substitui acompanhamento profissional.',
      includes: ['Campo pessoal', 'Campo profissional', 'Campo espiritual'],
      prices: [{ label: 'Valor', value: 'R$ 175,00' }],
    },
    {
      id: 'bastidores-da-mesa',
      slug: 'bastidores-da-mesa-cartomantes',
      title: 'Bastidores da Mesa (CARTOMANTES)',
      category: 'Cartomancia',
      image:
        'https://lh3.googleusercontent.com/HkIaqcfUToqQ2IhgCtT-FAbtaxaaCg6_mGkHce-G7Ey8L9TZakpD9wvU_L52HJsvimlHIPbycoegQjChxMbsCZ4tRR0cnUzPQQ',
      summary:
        'Leitura voltada a cartomantes que querem refletir sobre sua prática, seus consulentes e seu crescimento.',
      details:
        'É uma tiragem para quem lê cartas e deseja compreender o relacionamento com consulentes, pontos de desgaste, potencial de leitura, neutralidade, encantamento e o legado construído nas cartas.',
      includes: ['Prática como cartomante', 'Neutralidade', 'Legado'],
      prices: [{ label: 'Valor', value: 'R$ 55,00' }],
    },
    {
      id: 'meu-caminho-cartomancia',
      slug: 'meu-caminho-na-cartomancia',
      title: 'Meu caminho na Cartomancia',
      category: 'Cartomancia',
      image:
        'https://lh3.googleusercontent.com/4Q29_ZIXg_8RhqjBzKjdrubu9OmwpsxX6HqwxgaZZxhYHSidtw97d0HiDvNhx4yzLK-4nMpWweV_mxTYC1cdiOWlR3VboqZ2',
      summary:
        'Para iniciantes na cartomancia que querem entender energia atual, bloqueios, potencial e direção.',
      details:
        'Tiragem criada para estudantes e iniciantes que desejam compreender melhor seu caminho, reconhecer acertos, notar o que está sendo negligenciado, fortalecer o potencial e seguir com mais segurança.',
      includes: ['Jornada inicial', 'Bloqueios e potencial', 'Conselho'],
      prices: [{ label: 'Valor', value: 'R$ 40,00' }],
    },
    {
      id: 'melhorar-leituras',
      slug: 'como-melhorar-minhas-leituras-cartomantes',
      title: 'Como melhorar minhas leituras? (Cartomantes)',
      category: 'Cartomancia',
      image:
        'https://lh3.googleusercontent.com/vDu9Qt7P3Okgc-JXwEjjugM4u8JRtbAFSsWf_ymyza2KnKm-f0PR3spavl22dZBLVamSjyzgiImmxE-1-Ighs-Fkmkc7Ji-TFA',
      summary:
        'Uma leitura curta e prática para identificar ponto forte, ponto fraco, estudo e atitude para evoluir.',
      details:
        'Consulta enxuta para cartomantes que querem melhorar a interpretação. Mostra o que faz bem, o que limita, o que estudar, o que colocar em prática agora e qual conselho seguir.',
      includes: ['Ponto forte e fraco', 'Estudo e prática', 'Conselho'],
      prices: [{ label: 'Valor', value: 'R$ 35,00' }],
    },
  ] satisfies Service[],
  testimonials: [
    {
      id: 'feedback-1',
      title: 'Feedback 1',
      image:
        'https://lh3.googleusercontent.com/4mwxygKebB7WwpCa91RfoykF9DQoWUjXak58OfoBBu8roqQ7V-Q0nbK5ktBKtG-HoPWGJnNdngUiyyCFvn78HBisnBx7EKmBQW4',
    },
    {
      id: 'feedback-2',
      title: 'Feedback 2',
      image:
        'https://lh3.googleusercontent.com/-OzaPhNxU9Xme4l9mHEHaSTHvUruhU69JqP_VHw4RMWSsBl7TjJxj3yXCuyvgUmR5BxhR8iUeay1DC_Xnjxk_8bBU4GcDjV77A',
    },
    {
      id: 'feedback-3',
      title: 'Feedback 3',
      image:
        'https://lh3.googleusercontent.com/7vuer0m1u38Acm8vVxHOkCp9cghZyDUH5OX9WYeaZbSySVQS8M3ob6SRoAVBdM6Qm_ZD0j1sBx-6Fh50pRX0Vfrl4MxW00TwxQM',
    },
    {
      id: 'feedback-4',
      title: 'Feedback 4',
      image:
        'https://lh3.googleusercontent.com/QxHq6lw_E9JqJvVQvHSF-5cH7kY246ldhuH1wy7umKmSTa-RI-31tYi0iJhXQv96UYzKQsXtOHnD79Yg_-z3nh4v8U0I6-QSkQ',
    },
    {
      id: 'feedback-5',
      title: 'Feedback 5',
      image:
        'https://lh3.googleusercontent.com/n1zyP3Yq3e947KQ4whj7wshpazPqK9zoBkfXJSQU__UGumf_7hu6OBBn5kM6a00SQnncTVVJJpXsuaGp13z5wYw4l733ifYJ',
    },
    {
      id: 'feedback-6',
      title: 'Feedback 6',
      image:
        'https://lh3.googleusercontent.com/nRgwk2AjagQvcTZrJOkCRACpEhvsnyfJbpu6X-8rI55mU-26NCzu-HYF9WHXmc1YsuA1HEa8N7NYAeDhTsORYtc6fB-Mb9wxwA',
    },
    {
      id: 'feedback-7',
      title: 'Feedback 7',
      image:
        'https://lh3.googleusercontent.com/bYsICShWyYpuT1vjIYRw2fmgOL47z8YyXZV5azEJvG0PKCyllVh2LKnLFNR3Of36p2hwXlpuRFh9gKMXxTxdzTd3HslYc8TYaQ',
    },
    {
      id: 'feedback-8',
      title: 'Feedback 8',
      image:
        'https://lh3.googleusercontent.com/FmEJqDnqEZJlc6kyThs_U1dv5H3Xm9UBfpZqFzeCUqnBxqryfZ_qCSO2tyrv60pK3m89ljRX2qGL3DegNFOP00eAp27DSyv7-HA',
    },
  ] satisfies Testimonial[],
  faqs: [
    {
      question: 'Como funciona uma consulta?',
      answer:
        'Você escolhe a leitura, envia sua solicitação pelo WhatsApp, faz o pagamento e recebe o atendimento em texto ou áudio com fotos das cartas.',
    },
    {
      question: 'O atendimento é online?',
      answer:
        'Sim. O conteúdo público da referência indica atendimento online e a consulta pode começar mesmo se você não estiver no momento.',
    },
    {
      question: 'Posso perguntar sobre relacionamento?',
      answer:
        'Sim. Há diversas leituras voltadas a amor, reconciliação, ex, futuro amoroso e dinâmica da relação.',
    },
    {
      question: 'Posso fazer mais de uma pergunta?',
      answer:
        'Sim, em leituras específicas com pacote de perguntas, como a consulta objetiva com 1, 3, 5 ou 7 perguntas.',
    },
    {
      question: 'Quanto tempo demora para receber minha leitura?',
      answer:
        'O prazo informado na referência é de até 48 horas após o pagamento e o envio do comprovante.',
    },
    {
      question: 'Minha consulta é confidencial?',
      answer:
        'Sim. A própria página de referência destaca sigilo e atendimento com ética do tarot.',
    },
    {
      question: 'Como faço o pagamento?',
      answer:
        'Na página de referência aparecem cartão de crédito, Pix, PayPal e Wise.',
    },
    {
      question: 'Preciso saber alguma coisa sobre Tarot antes?',
      answer:
        'Não. Basta trazer sua dúvida com tranquilidade; a leitura é conduzida de forma acolhedora e personalizada.',
    },
  ],
} as const;

export function sanitizePhone(phone: string) {
  return phone.replace(/\D/g, '');
}

export function formatBRL(value: string) {
  return value;
}
