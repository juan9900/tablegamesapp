"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const formSchema = z.object({
  game_name: z.string().min(1, "El nombre del juego es obligatorio"),
  game_genre: z.string().min(1, "El género del juego es obligatorio"),
  min_players: z.coerce
    .number()
    .min(1, "El mínimo de jugadores es obligatorio"),
  max_players: z.coerce
    .number()
    .min(1, "El máximo de jugadores es obligatorio"),
  internal_code: z.string().optional(),
  copies: z
    .array(z.object({ internal_code: z.string().optional() }))
    .optional(),
});
export function NewGameForm({}) {
  //1. Define the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      game_name: "",
      game_genre: "",
      min_players: 1,
      max_players: 1,
      copies: [{ internal_code: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "copies",
  });

  const { watch } = form;
  const watchedGameName = watch("game_name");

  //2. Define a submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="game_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Catán" {...field} />
              </FormControl>
              <FormDescription>
                Este es el nombre público del juego.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="game_genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Género</FormLabel>
              <FormControl>
                <Input placeholder="Estrategia" {...field} />
              </FormControl>
              <FormDescription>
                Este es el género público del juego.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="min_players"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mínimo de jugadores</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>
                Cantidad mínima de jugadores para este juego.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="min_players"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Máximo de jugadores</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>
                Cantidad máxima de jugadores para este juego.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Copias del juego</FormLabel>
          <FormDescription>
            Acá podrás agregar el código interno de cada copia de juego que
            quieras. Si no quieres especificar códigos, agrega tantas copias
            como sea necesario y deja los campos vacíos, de esta forma se
            generarán los codigos automáticamente. Ejemplo:{" "}
            {`"CAT-001" , "CAT-002", etc.`}{" "}
            <span className="font-bold">
              Esto no estará visible al público.
            </span>
          </FormDescription>
          <FormDescription>
            Actualmente has seleccionado{" "}
            <span className="font-bold text-neutral-800">{fields.length} </span>
            {fields.length === 1 ? "copia" : "copias"}.
          </FormDescription>
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`copies.${index}.internal_code`}
              render={({ field: f }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Input placeholder={`Código copia #${index + 1}`} {...f} />
                  </FormControl>
                  <Button
                    disabled={fields.length === 1}
                    type="button"
                    variant="outline"
                    onClick={() => remove(index)}
                  >
                    Eliminar
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ internal_code: "" })}
          >
            Nueva copia
          </Button>
        </div>

        <Button type="submit">Agregar</Button>
      </form>
    </Form>
  );
}
