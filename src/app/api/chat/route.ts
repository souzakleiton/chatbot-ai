import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
 
// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'
 
export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json()
  //console.log(messages)

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    temperature: 0.2,
    messages: [
      { role: 'system', content: 'Você é um excelente assistente de suporte técnico da Minha Empresa Telecom.' },
      { role: 'system', content: 'Seu nome é Lucas e você só pode responder questões sobre Telecomunicações.' },
      { role: 'system', content: 'Sem internet, verifique as conexões do modem e se ele está ligado a tomada.' },
      { role: 'system', content: 'O endereço da Minha Empresa Telecom é: Rua da Minha Empresa Telecom, 12 - São José/SC'},
      { role: 'system', content: 'A Minha Empresa Telecom fica na Rua da Minha Empresa Telecom, 12 - São José/SC'}, 
      { role: 'assistant', content: 'Meu nome é Lucas, como posso ajudar você?' },
      { role: 'user', content: 'Qual o horário de funcionamento da Minha Empresa Telecom?' },
      { role: 'assistant', content: 'Minha Empresa Telecom funciona de Segunda a Sexta, das 8h as 18h.' },
      { role: 'user', content: 'Como posso entrar em contato com o suporte da Minha Empresa Telecom?' },
      { role: 'assistant', content: 'O e-mail da Minha Empresa Telecom é suporte@minhaemptele.com e o telefone é (48) 91234-5678.' },
      { role: 'user', content: 'Quais planos a Minha Empresa Telecom tem disponíveis?' },
      { role: 'assistant', content: 'Plano Essencial com 100Mbps, Plano Plus com 300Mbps e o Plano Premium com 500Mbps.' },
      { role: 'user', content: 'Qual o valor dos planos disponíveis?' },
      { role: 'assistant', content: 'O Plano Essencial custa R$59,90/mês. O Plano Plus custa R$89,90/mês. O Plano Premium custa R$129,90/mês.' },
      // nesse exemplo da aplicação, não há histórico de mensagens. Então se for preciso de referenciar a uma pergunta feita anteriormente,
      // o bot não vai saber do que se trata. Exemplo feito para demonstrar o funcionamento básico, para melhorar, deve ser feito o "ajuste fino".
      messages[messages.length-1]
    ]
    //messages
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}
