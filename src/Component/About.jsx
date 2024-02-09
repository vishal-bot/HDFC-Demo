const links = [
    { name: 'Open roles', href: '#' },
    { name: 'Internship program', href: '#' },
    { name: 'Our values', href: '#' },
    { name: 'Meet our leadership', href: '#' },
  ]
  const stats = [
    { name: 'Offices worldwide', value: '12' },
    { name: 'Full-time colleagues', value: '300+' },
    { name: 'Hours per week', value: '40' },
    { name: 'Paid time off', value: 'Unlimited' },
  ]

export default function About() {
    return (
        <>
        <div className="w-full sm:px-6 md:px-8 lg:ps-72">
            <header className="bg-white text-center border-b-2">
            <h1 className="block text-3xl font-bold text-gray-800 sm:text-5xl px-4 py-6 sm:px-6 lg:px-8 dark:text-white">About Us Demo Page</h1>
            </header>
            <div className="mx-auto max-w-6xl py-6 px-6 sm:px-6 text-gray-900 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">Work with us</h2>
                            <p className="mt-6 text-lg leading-8">
                                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                                fugiat veniam occaecat fugiat aliqua.
                            </p>
                        </div>
                        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 sm:grid-cols-2 md:flex lg:gap-x-10">
                                {links.map((link) => (
                                    <a key={link.name} href={link.href}>
                                        {link.name} <span aria-hidden="true">&rarr;</span>
                                    </a>
                                ))}
                            </div>
                            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                                {stats.map((stat) => (
                                    <div key={stat.name} className="flex flex-col-reverse">
                                        <dt className="text-base leading-7">{stat.name}</dt>
                                        <dd className="text-2xl font-bold leading-9 tracking-tight">{stat.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
            </div>
            </div>
        </>
    )
}