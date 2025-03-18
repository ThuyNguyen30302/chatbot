import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Chat } from '@/components/chat';
import { convertToUIMessages } from '@/lib/utils';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { DataStreamHandler } from '@/components/data-stream-handler';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const cookieStore = await cookies();
  const chatModelFromCookie = cookieStore.get('chat-model');
  
  if (!chatModelFromCookie) {
    return (
      <>
        <Chat
          id={'1'}
          initialMessages={convertToUIMessages(['messagesFromDb'])}
          selectedChatModel={DEFAULT_CHAT_MODEL}
          selectedVisibilityType={'public'}
          isReadonly={false}
        />
        <DataStreamHandler id={id} />
      </>
    );
  }

  return (
    <>
      <Chat
        id={'1'}
        initialMessages={convertToUIMessages(['messagesFromDb'])}
        selectedChatModel={chatModelFromCookie.value}
        selectedVisibilityType={'public'}
        isReadonly={false}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
