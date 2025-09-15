import Accordeon from "@/components/common/Accordeon"
import Skeleton from "@/components/common/Skeleton"

const Home = () => {
  return (
    <Skeleton>
      <Accordeon 
        title="Como alugar um livro?"
        content="Para alugar um livro é simples! Basta clicar no botão “Quero alugar” e apontar a câmera do seu celular para o QR code. Em seguida você lê o livro e o devolve em qualquer estante do projeto Livro Livre para que outros possam alugá-lo"
      />
    </Skeleton>
  )
}

export default Home