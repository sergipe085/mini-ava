"use client"

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { revalidatePath } from 'next/cache';
import React, { useState } from 'react';

type Props = {
    action: () => Promise<void>;
    children: React.ReactNode;
    variant: "default" | "destructive",
    title: string | undefined;
    description: string | undefined;
};

export function ConfirmationModal({ children, action, title, description, variant = "default" }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    async function handleAction() {
        setLoading(true);
        await action();
        setLoading(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                { children }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title ?? "Tem certeza que deseja deletar?"}</DialogTitle>
                    <DialogDescription>{"Essa ação não pode ser desfeita."}</DialogDescription>
                </DialogHeader>

                <DialogFooter className='flex flex-row gap-2 justify-center'>
                    <Button onClick={handleAction} disabled={loading} variant={variant}>Confirmar</Button>
                    <DialogClose>
                        <Button variant={"outline"} disabled={loading}>Cancelar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}