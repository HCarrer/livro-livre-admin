import { AccordeonProps } from "@/components/common/Accordeon"

const RENT: AccordeonProps = {
	title: 'Como alugar um livro?',
	content: 'Para alugar um livro é simples! Basta clicar no botão “Quero alugar” e apontar a câmera do seu celular para o QR code. Em seguida você lê o livro e o devolve em qualquer estante do projeto Livro Livre para que outros possam alugá-lo.'
}

const RETURN: AccordeonProps = {
	title: 'Como devolver um livro?',
	content: 'Para devolver um livro basta clicar no botão “Quero devolver” e apontar a câmera do seu celular para o QR code. Depois de receber a mensagem de confirmação coloque o livro na área designada na estante.'
}

const DONATE: AccordeonProps = {
	title: 'Como doar um livro?',
	content: 'Para doar um livro basta se dirigir a estante mais próxima e deixar sua doação no local designado.'
}

export const ACCORDEONS: AccordeonProps[] = [
	RENT,
	RETURN,
	DONATE
]