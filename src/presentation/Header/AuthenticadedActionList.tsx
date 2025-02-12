import { toast } from "react-toastify"
import { useAuthContext } from "../../app/hooks/useAuthContext"
import { List, ListItem } from "./styles"
import { useNavigate } from "react-router"
import { IconAvatar } from "../../components/Icons"
import { TransparentButton } from "../../components/TransparentButton"

export const AuthenticadedActionList = () => {
    const {logout} = useAuthContext()
    const navigate = useNavigate()

    const onAskForLogout = () => {
        try{
            logout();
            toast.success('Logout realizado com sucesso');
            navigate('/auth/login')
        } catch (error) {
            toast.error('Erro ao realizar logout');
        }
    }

    return (
        <List>
            <ListItem>
                Joana da Silva Oliveira
            </ListItem>
            <ListItem>
                <IconAvatar />
            </ListItem>
            <ListItem>
                <TransparentButton onClick={onAskForLogout}>
                    Logout
                </TransparentButton>
            </ListItem>
        </List>
    )
}