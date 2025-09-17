import { AccordionProps } from "@/components/common/Accordion"
import { RENT_BUTTON_LABEL, RETURN_BUTTON_LABEL } from "./common"

const RENT: AccordionProps = {
	title: 'Como alugar um livro?',
	content: `Para alugar um livro é simples! Basta clicar no botão “${RENT_BUTTON_LABEL}” e apontar a câmera do seu celular para o QR code. Em seguida você lê o livro e o devolve em qualquer estante do projeto Livro Livre para que outros possam alugá-lo.`
}

const RETURN: AccordionProps = {
	title: 'Como devolver um livro?',
	content: `Para devolver um livro basta clicar no botão “${RETURN_BUTTON_LABEL}” e apontar a câmera do seu celular para o QR code. Depois de receber a mensagem de confirmação coloque o livro na área designada na estante.`
}

const DONATE: AccordionProps = {
	title: 'Como doar um livro?',
	content: 'Para doar um livro basta se dirigir a estante mais próxima e deixar sua doação no local designado.'
}

export const ACCORDIONS: AccordionProps[] = [
	RENT,
	RETURN,
	DONATE
]