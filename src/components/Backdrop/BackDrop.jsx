import {RegistrationForm} from '../../components/Forms/RegistrationForm';
import { Section, Backdrop} from '../../pages/common.styled';
import Logo from 'components/Logo/Logo';

export const BackdropBox = () => {
    return (<Backdrop> 
             <Section>
                <Logo/>
                <RegistrationForm/>
                </Section>
    </Backdrop>)
}