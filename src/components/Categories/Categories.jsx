import './Categories.css'
import IconButton from '../IconButton/IconButton'
import { MdOutlineBusinessCenter, MdRestaurant, MdFlight, MdTheaterComedy } from 'react-icons/md'
import { PiMicrophoneStageBold } from "react-icons/pi";
import { GiPartyPopper } from "react-icons/gi";

function Categories() {
    return (
        <div className="categories-container">
            <div className="icon-grid">
                <IconButton Icon={PiMicrophoneStageBold} label="Conciertos" />
                <IconButton Icon={MdOutlineBusinessCenter} label="Negocios" />
                <IconButton Icon={MdRestaurant} label="Comida" />
                <IconButton Icon={MdFlight} label="Viajes" />
                <IconButton Icon={GiPartyPopper} label="Carnaval" />
                <IconButton Icon={MdTheaterComedy} label="Teatro" />
            </div>
        </div>
    )
}

export default Categories