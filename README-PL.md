# Wizualizacja Sygnału Radiowego

System wizualizacji sygnału radiowego w czasie rzeczywistym z komunikacją WebSocket.

## Wymagania wstępne

- Docker i Docker Compose
- LUB Node.js 20+ (dla lokalnego developmentu)

## Szybki start z Dockerem

1. Sklonuj repozytorium
2. Skopiuj plik środowiskowy:
   ```bash
   cp .env.example .env
   ```

3. Uruchom wszystkie serwisy:
   ```bash
   docker-compose up
   ```

4. Dostęp do aplikacji:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

## Lokalny development (bez Dockera)

### Backend

```bash
cd back
npm install
npm test
npm start
```

### Frontend

```bash
cd front
npm install
npm run dev
```

## Polecenia Docker

### Uruchomienie serwisów
```bash
docker-compose up -d
```

### Zatrzymanie serwisów
```bash
docker-compose down
```

### Przebudowa kontenerów
```bash
docker-compose up --build
```

### Podgląd logów
```bash
docker-compose logs -f
```

### Logi tylko z backendu
```bash
docker-compose logs -f backend
```

### Logi tylko z frontendu
```bash
docker-compose logs -f frontend
```

## Struktura projektu

```
.
├── back/                 # Backend Node.js + TypeScript
│   ├── lib/             # Logika generowania sygnału
│   ├── App.ts           # Konfiguracja serwera Express
│   ├── WebSocketService.ts  # Zarządzanie WebSocket
│   └── server.ts        # Punkt wejścia
├── front/               # Frontend React + TypeScript
│   └── src/
│       ├── types/       # Interfejsy TypeScript
│       ├── hooks/       # Hooki React
│       └── components/  # Komponenty React
├── docker-compose.yml   # Orkiestracja kontenerów
└── REQUIREMENTS_DOCS/   # Dokumentacja projektu
```

## Workflow developmentu

1. Wprowadź zmiany w kodzie źródłowym
2. Wolumeny Docker automatycznie synchronizują zmiany
3. Backend: ts-node automatycznie restartuje
4. Frontend: Vite wykonuje hot-reload

## Testowanie

### Backend
```bash
cd back
npm test
```

### Frontend
```bash
cd front
npm test
```

## Architektura

- **Backend**: Generuje 1000 losowych liczb (0-255) co 100ms
- **WebSocket**: Strumieniowanie danych w czasie rzeczywistym
- **Frontend**: Renderuje dane jako kolorową siatkę 40×25 na canvasie

## Wymagania projektu

### Zasady architektury
1. **Design modułowy**: Funkcjonalność podzielona na małe, niezależne moduły
2. **Programowanie funkcyjne**: Wzorce funkcyjne (bez klas w backendzie)
3. **Test-Driven Development**: Testy pisane przed implementacją
4. **TypeScript**: Bezpieczeństwo typów w całym projekcie
5. **Interfejsy**: Jasno zdefiniowane interfejsy dla struktur danych

### Backend

#### Generowanie sygnału
- **Moduł**: `SignalGenerator.ts`
- **Funkcja**: `generateSignal(length: number, min: number, max: number): number[]`
- **Cel**: Generowanie mockowanych danych sygnału radiowego
- **Parametry**:
  - `length`: Liczba próbek do wygenerowania (domyślnie: 1000)
  - `min`: Minimalna wartość intensywności sygnału (domyślnie: 0)
  - `max`: Maksymalna wartość intensywności sygnału (domyślnie: 255)

#### Serwis WebSocket
- **Moduł**: `WebSocketService.ts`
- **Funkcja**: `createWebSocketServer(server: HttpServer)`
- **Cel**: Zarządzanie połączeniami WebSocket i rozgłaszanie danych
- **Zachowanie**:
  - Akceptuje połączenia WebSocket
  - Generuje dane sygnału co 100ms
  - Rozgłasza do wszystkich podłączonych klientów
  - Zwraca funkcję cleanup dla graceful shutdown

### Frontend

#### Definicje typów
```typescript
export type SignalData = number[];

export interface SignalCanvasProps {
    data: SignalData;
    width: number;
    height: number;
}
```

#### Hook WebSocket
- **Plik**: `hooks/useRadioSignal.ts`
- **Cel**: Zarządzanie połączeniem WebSocket i stanem danych sygnału
- **Wymagania**:
  - Połączenie do `ws://localhost:3000`
  - Parsowanie przychodzących danych JSON
  - Utrzymywanie aktualnych danych sygnału w state
  - Obsługa cyklu życia połączenia

#### Komponent Canvas
- **Plik**: `components/SignalCanvas.tsx`
- **Cel**: Renderowanie danych sygnału jako kolorowej siatki
- **Specyfikacja**:
  - Rozmiar canvas: 800x500px
  - Układ siatki: 40 kolumn × 25 wierszy (1000 komórek)
  - Mapowanie kolorów: Wartość (0-255) na intensywność koloru

## Przepływ danych

1. Backend generuje 1000 losowych liczb (0-255) co 100ms
2. Backend rozgłasza tablicę przez WebSocket do wszystkich klientów
3. Frontend odbiera tablicę przez hook WebSocket
4. Frontend renderuje tablicę jako kolorową siatkę 40×25 na canvasie
5. Aktualizacje w czasie rzeczywistym (10 razy na sekundę)

## Specyfikacja wizualizacji

- **Wymiary siatki**: 40 kolumn × 25 wierszy = 1000 komórek
- **Rozmiar canvas**: 800px × 500px
- **Rozmiar komórki**: 20px × 20px
- **Schemat kolorów**: Mapowanie wartości (0-255) na gradient kolorów
  - Przykład: `rgb(value, 0, 0)` dla intensywności czerwieni
  - Alternatywa: Mapowanie HSL dla pełnego spektrum

## Rozważania wydajnościowe

- Częstotliwość aktualizacji WebSocket: 100ms (10 FPS)
- Rozmiar payload danych: ~4KB na wiadomość (1000 liczb)
- Przerysowania canvas: Ograniczone do częstotliwości WebSocket

## Przyszłe rozszerzenia (poza zakresem)

- Konfigurowalne parametry sygnału przez UI
- Wiele trybów wizualizacji (fala, spektrogram)
- Przetwarzanie sygnału (FFT, filtrowanie)
- Nagrywanie i odtwarzanie
- Integracja z prawdziwym sprzętem radiowym

## Licencja

ISC
