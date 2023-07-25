'use client'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { useChat } from 'ai/react'
import { ScrollArea } from './ui/scroll-area'

export interface chatProps {}

export function Chat(props: chatProps){
    const { messages, input, handleInputChange, handleSubmit} = useChat({api: '/api/chat',})

    return (
        <Card className='w-[410px]'>
          <CardHeader>
            <CardTitle>Suporte</CardTitle>
            <CardDescription>Assistente virtual de suporte técnico.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className='h-[540px] w-full rounded-md p-4 overflow-y-auto'> 
                { messages.map(message => {
                  return (
                    <div key={message.id} className='flex gap-3 text-slate-500 text-sm mb-4'>
                      { message.role === 'user' && (
                        <Avatar>
                          <AvatarFallback>EU</AvatarFallback>
                          <AvatarImage src='user.png' />
                        </Avatar>
                      )}
                      { message.role === 'assistant' && (
                        <Avatar>
                          <AvatarFallback>AI</AvatarFallback>
                          <AvatarImage src='gpt.png' />
                        </Avatar>
                      )}

                      <p className='leading-relaxed'>
                        <span className='block font-bold text-slate-700'>{ message.role === 'user' ? 'Você' : 'Assistente'}</span>
                        { message.content }  
                      </p>
                    </div>
                  )
                })}
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <form className='w-full flex gap-2' onSubmit={handleSubmit}>
                <Input placeholder='Digite...' value={input} onChange={handleInputChange} />
                <Button type='submit' variant={'outline'}>Enviar</Button>
              </form>
            </CardFooter>
        </Card>
    )
}