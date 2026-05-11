import requests
from bs4 import BeautifulSoup
import json  # <--- Nueva librería para guardar datos

url = "https://techcrunch.com/"
headers = {'User-Agent': 'Mozilla/5.0'}
respuesta = requests.get(url, headers=headers)

if respuesta.status_code == 200:
    sopa = BeautifulSoup(respuesta.text, 'html.parser')
    titulares = sopa.select('a.loop-card__title-link', limit=5)
    
    lista_noticias = []
    
    print("\n--- GUARDANDO ÚLTIMAS NOTICIAS ---")
    
    for titular in titulares:
        texto_limpio = titular.get_text().strip()
        link = titular.get('href')
        
        noticia = {
            "titulo": texto_limpio,
            "enlace": link
        }
        lista_noticias.append(noticia)
        print(f"Guardado: {texto_limpio}")

    with open('datos.json', 'w', encoding='utf-8') as archivo:
        json.dump(lista_noticias, archivo, indent=4, ensure_ascii=False)
    
    print("\n¡Listo! El archivo 'datos.json' ha sido creado.")

else:
    print("Error de conexión.")