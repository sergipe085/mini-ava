"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from './button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu';
import { ListFilter } from 'lucide-react';

type Filter = {
    title: string;
    name: string;
    values: {
        label: string;
        value: string;
    }[]
}

type Props = {
    filters: Filter[]
}

export function FilterComponent({ filters }: Props) {
    const searchParams = useSearchParams();

    const [values, setValues] = useState<Record<string, string>>(() => {
        const v: Record<string, string> = {};

        filters.forEach(f => {
            v[f.name] = searchParams.get(f.name) || "";
        })

        return v;
    });

    const router = useRouter();
    const pathname = usePathname();

    const handleFilterChange = () => {
        if (values) {
            const params = new URLSearchParams();
            Object.keys(values).map(key => {
                if (values[key] && values[key] != "TODOS") params.set(key, values[key]);
            })
            router.push(`${pathname}?${params.toString()}`);

            setOpen(false)
        }
    };

    function handleValueChange(name: string, value: string) {
        setValues({
            ...values,
            [name]: value
        })
    }

    const [open, setOpen] = useState<boolean>(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                >
                    <ListFilter className="h-3.5 w-3.5" />
                    <span>Filtros</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator className='mb-4'/>
                
                <div className="flex flex-col mb-4 items-center gap-4 px-4">
                    {
                        filters?.map(filter => {
                            return (
                                <div key={filter.name} className='flex flex-col gap-0'>
                                    <h1 className='text-foreground'>{ filter.title }</h1>
                                    <Select defaultValue={filter.values.find(v => v.value == searchParams.get(filter.name))?.value} key={filter.name} onValueChange={(value) => handleValueChange(filter.name, value)}>
                                        <SelectTrigger className='w-72'>
                                            <SelectValue placeholder={`Selecione o ${filter.title}`} />
                                        </SelectTrigger>
                                        <SelectContent className=''>
                                            <SelectGroup>
                                            <SelectLabel>{filter.title}</SelectLabel>
                                            <SelectItem value={"TODOS"}>TODOS</SelectItem>
                                                {
                                                    filter.values?.map(({ value, label }) => {
                                                        return (
                                                            <SelectItem key={value} value={value}>{label}</SelectItem>
                                                        )
                                                    })
                                                }   
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )
                        })
                    }
                    <Button onClick={handleFilterChange} className='w-full'>Aplicar filtros</Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};