import { FunctionComponent } from 'react'

import { serverName } from '../config'

const { ipcRenderer } = window.require('electron')

const Titlebar: FunctionComponent = () => {
    const minimize = () => ipcRenderer.send('minimize')
    const quit = () => ipcRenderer.send('close')

    return (
        <header className='titlebar'>
            <div className='controls'>
                <p className='title'>{serverName}</p>
                <button type='button' onClick={minimize} id='minimize'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
                        <path
                            d='M2 9.75C2 9.33579 2.33579 9 2.75 9H17.25C17.6642 9 18 9.33579 18 9.75C18 10.1642 17.6642 10.5 17.25 10.5H2.75C2.33579 10.5 2 10.1642 2 9.75Z'
                        />
                    </svg>
                </button>
                <button type='button' onClick={quit} id='close'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28' fill='none'>
                        <path
                            d='M3.52499 3.71761L3.61612 3.61612C4.07173 3.1605 4.79155 3.13013 5.28239 3.52499L5.38388 3.61612L14 12.233L22.6161 3.61612C23.1043 3.12796 23.8957 3.12796 24.3839 3.61612C24.872 4.10427 24.872 4.89573 24.3839 5.38388L15.767 14L24.3839 22.6161C24.8395 23.0717 24.8699 23.7915 24.475 24.2824L24.3839 24.3839C23.9283 24.8395 23.2085 24.8699 22.7176 24.475L22.6161 24.3839L14 15.767L5.38388 24.3839C4.89573 24.872 4.10427 24.872 3.61612 24.3839C3.12796 23.8957 3.12796 23.1043 3.61612 22.6161L12.233 14L3.61612 5.38388C3.1605 4.92827 3.13013 4.20845 3.52499 3.71761L3.61612 3.61612L3.52499 3.71761Z'
                        />
                    </svg>
                </button>
            </div>
        </header>
    )
}
export default Titlebar
