import React, { useState } from 'react'
import { TbGauge, Tb3DRotate, TbAccessPoint, TbActivity, TbAd } from "react-icons/tb";
import { IoIosArrowDown, IoSettingsSharp } from "react-icons/io";
import { MdSettings } from "react-icons/md";
import { Collapse } from 'react-collapse';
import { useNavigate } from 'react-router-dom';

export function Sidebar(props) {

    const navigate = useNavigate()
    const { iconOnly, seticonOnly } = props
    const [Pages, setPages] = useState([
        {
            id: 1,
            title: "Kurum Yönetimi",
            url: "/Dashboard",
            icon: <TbGauge className=' text-blue-700' />
        },
        {
            id: 2,
            title: "Hastalar",
            isOpened: false,
            icon: <Tb3DRotate className='text-red-700' />,
            items: [
                {
                    id: 1,
                    subtitle: "Ön Kayıtlar",
                    url: "/Preregistrations"
                },
                {
                    id: 1,
                    subtitle: "Kurumdaki Hastalar",
                    url: "/Patients"
                },
                {
                    id: 1,
                    subtitle: "Hasta Tanımları",
                    url: "/Patientdefines"
                },
            ]
        },
        {
            id: 3,
            title: "Siparişler",
            isOpened: false,
            icon: <TbAccessPoint className='text-orange-300' />,
            items: [
                {
                    id: 4,
                    subtitle: "Açık Siparişler",
                    url: "/Purchaseorders"
                },
            ]
        },
        {
            id: 4,
            title: "Stok Yönetimi",
            isOpened: false,
            icon: <TbActivity className='text-green-400' />,
            items: [
                {
                    id: 7,
                    subtitle: "Ürünler",
                    url: "/Stocks"
                },
                {
                    id: 7,
                    subtitle: "Ürün Hareketleri",
                    url: "/Stockmovements"
                },
                {
                    id: 7,
                    subtitle: "Ürün Hareketi İncele",
                    url: "/Stockmovement"
                },
            ]
        },
        {
            id: 5,
            title: "Ayarlar",
            isOpened: false,
            icon: <MdSettings className='text-green-800' />,
            items: [
                {
                    id: 10,
                    subtitle: "Roller",
                    url: "/Roles"
                },
                {
                    id: 10,
                    subtitle: "Departmanlar",
                    url: "/Departments"
                },
                {
                    id: 10,
                    subtitle: "İstasyonlar",
                    url: "/Stations"
                },
                {
                    id: 11,
                    subtitle: "Kullanıcılar",
                    url: "/Users"
                },
                {
                    id: 12,
                    subtitle: "Durumlar",
                    url: "/Cases"
                },
                {
                    id: 13,
                    subtitle: "Birimler",
                    url: "/Units"
                },
                {
                    id: 14,
                    subtitle: "Stok Tanımları",
                    url: "/Stockdefines"
                },
                {
                    id: 14,
                    subtitle: "Kullanııclar",
                    url: "/Users"
                },
                {
                    id: 14,
                    subtitle: "Dosyalar",
                    url: "/Files"
                },
                {
                    id: 14,
                    subtitle: "Hasta Türleri",
                    url: "/Patienttypes"
                },
                {
                    id: 14,
                    subtitle: "Müşteri Türleri",
                    url: "/Costumertypes"
                },
            ]
        },
    ])

    const openCollapse = (e) => {
        console.log('e: ', e);
        const olddata = Pages
        olddata.forEach(element => {
            if (element.id === e) {
                element.isOpened = !element.isOpened
            } else {
                element.isOpened = false
            }
        });
        setPages([...olddata])
    }

    return (
        <div className={`${iconOnly ? 'w-[50px]' : 'w-[250px]'} flex flex-col justify-start items-start mt-[58.61px] bg-white dark:bg-Contentfg min-h-[calc(100vh_-_58.61px)] transition-all ease-in-out duration-500`}>
            <div className='flex flex-col w-full'>
                <div className=''>
                    {Pages.map((item, index) => {
                        return <div key={index} className='w-full flex items-start flex-col relative'>
                            <div onMouseEnter={() => {
                                if (iconOnly) {
                                    openCollapse(item.id)
                                }
                            }}
                                onMouseLeave={() => {
                                    if (iconOnly) {
                                        openCollapse(item.id)
                                    }
                                }}
                                onClick={() => { openCollapse(item.id) }} className='group py-2 mr-8 flex flex-row rounded-r-full hover:bg-[#c1d8e159] dark:hover:bg-NavHoverbg w-full justify-between items-center cursor-pointer transition-all duration-300'>
                                <div className='flex flex-row items-center justify-center'>
                                    <div className='ml-2 p-2 text-lg text-purple-600 rounded-full bg-[#6c729333] group-hover:bg-[#7eb7ce] dark:group-hover:bg-Contentfg transition-all duration-300'>
                                        {item.icon}
                                    </div>
                                    <h1 className={`${iconOnly ? 'hidden' : 'visible'} m-0 ml-2 text-TextColor text-sm tracking-wider font-semibold  group-hover:text-[#2b7694] transition-all duration-1000`}>
                                        {item.title}
                                    </h1>
                                </div>
                                {item.items ? <IoIosArrowDown className='text-md mr-4 text-TextColor ' /> : null}
                            </div>
                            {!iconOnly && item.items ?
                                <Collapse isOpened={item.isOpened}>
                                    {item.items.map((subitem, index) => {
                                        return <h1 key={index + index} onClick={() => { navigate(subitem.url) }} className=' m-0 cursor-pointer hover:text-[#2b7694] whitespace-nowrap dark:hover:text-white text-TextColor text-sm w-full px-8 py-1' > {subitem.subtitle}</h1>
                                    })}
                                </Collapse>
                                : null}
                            {iconOnly ?
                                <div className={`${item.isOpened ? 'visible' : 'hidden'} transition-all ease-in-out p-4 whitespace-nowrap duration-500 cursor-pointer shadow-lg left-[50px] top-0 z-50 absolute bg-white dark:bg-NavHoverbg`} onMouseLeave={() => { openCollapse(item.id) }}>
                                    {item.url ? <h3 className='m-0 cursor-pointer hover:text-[#2b7694] dark:hover:text-white text-TextColor font-bold font-Common'>{item.title}</h3> : <h3 className='text-TextColor font-bold font-Common'>{item.title}</h3>}
                                    {item.items ?
                                        <Collapse isOpened={item.isOpened}>
                                            {item.items.map((subitem, index) => {
                                                return <h1 key={index + index + index} className='hover:text-[#2b7694] m-0 whitespace-nowrap dark:hover:text-white text-TextColor text-sm w-full px-2 py-1'>{subitem.subtitle}</h1>
                                            })}
                                        </Collapse>
                                        : null}
                                </div>
                                : null}
                        </div>
                    })}

                </div>
            </div>
        </div >
    )
}
export default Sidebar