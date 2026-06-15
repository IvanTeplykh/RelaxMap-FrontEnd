# Інструкція з використання компонентів карти

У проєкті реалізовано два взаємопов'язані компоненти для роботи з картами Google Maps:

1. **`LocationInputWithMap`** — інпут для введення/пошуку адрес з автодоповненням (Google Places Autocomplete) та інтерактивною картою для вибору точки.
2. **`LocationMap`** — статична карта для відображення локації за координатами.

---

## 1. Компонент введення: `LocationInputWithMap`

Цей компонент використовується у формах створення та редагування локацій. Він дозволяє користувачу знайти адресу за допомогою текстового пошуку або просто клікнувши мишкою по інтерактивній карті.

### Імпорт компонента

```tsx
import LocationInputWithMap from "@/components/Map/LocationInputWithMapComponent";
```

### Параметри (Props)

Компонент приймає такі властивості відповідно до інтерфейсу `LocationInputWithMapProps`:

| Назва пропса | Тип | Обов'язковий | Опис |
| :--- | :--- | :--- | :--- |
| `location` | `string` | **Так** | Текстове значення адреси (контрольований стан). |
| `setLocation` | `(value: string) => void` | **Так** | Коллбек для оновлення значення адреси. |
| `onCoordinatesChange` | `(coords: { lat: number; lon: number } \| null) => void` | Ні | Коллбек для отримання координат (`{ lat, lon }`). |
| `className` | `string` | Ні | CSS-клас для стилізації поля введення. |
| `inputWrapperClassName` | `string` | Ні | CSS-клас для стилізації контейнера вводу. |

### Повернення даних для відправки на бекенд

Для збору даних та їхньої подальшої відправки на бекенд, батьківський компонент повинен зберігати у своєму стані як **адресу**, так і **координати**:

```tsx
import { useState } from "react";
import LocationInputWithMap from "@/components/Map/LocationInputWithMapComponent";

export function CreateLocationForm() {
  const [location, setLocation] = useState<string>("");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Формуємо payload для відправки на сервер
    const backendPayload = {
      address: location,
      latitude: coordinates?.lat ?? null,
      longitude: coordinates?.lon ?? null,
    };

    console.log("Дані для відправки:", backendPayload);
    // await api.post("/locations", backendPayload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <LocationInputWithMap
        location={location}
        setLocation={setLocation}
        onCoordinatesChange={setCoordinates}
      />
      <button type="submit">Зберегти локацію</button>
    </form>
  );
}
```

---

## 2. Компонент перегляду: `LocationMap`

Цей компонент використовується для відображення детальної картки локації. Він рендерить статичну карту із маркером на заданих координатах. Якщо координати відсутні, карта фокусується на географічному центрі України із загальним масштабом та не малює маркер.

### Імпорт компонента

```tsx
import LocationMap from "@/components/Map/LocationMap";
```

### Параметри (Props)

Компонент приймає такі властивості відповідно до типу `LocationMapProps`:

| Назва пропса | Тип | Обов'язковий | Опис |
| :--- | :--- | :--- | :--- |
| `coordinates` | `{ lat: number; lon: number }` | Ні | Координати локації. Якщо передані — малюється маркер, а карта масштабується на рівень `14`. Якщо `undefined` — показується оглядова карта України (масштаб `5`). |

### Приклад використання

```tsx
import LocationMap from "@/components/Map/LocationMap";

interface LocationDetailsProps {
  locationData: {
    name: string;
    latitude?: number;
    longitude?: number;
  };
}

export function LocationDetails({ locationData }: LocationDetailsProps) {
  const coords =
    locationData.latitude && locationData.longitude
      ? { lat: locationData.latitude, lon: locationData.longitude }
      : undefined;

  return (
    <div>
      <h1>{locationData.name}</h1>
      {/* Передаємо координати у компонент відображення карти */}
      <LocationMap coordinates={coords} />
    </div>
  );
}
```

---

## Особливості логіки фільтрації та обробки помилок

1. **Автоматичне очищення країни (`removeUkraine`):**
   Компонент автоматично прибирає перший сегмент адреси (наприклад, назву країни `"Україна, "`), якщо після неї вказано конкретне місто або область. Це робить вигляд адрес у системі чистішим (наприклад, замість `"Україна, Київська область, Київ"` зберігається та показується `"Київська область, Київ"`).
2. **Обробка стану помилки:**
   Якщо пошук за введеною адресою не дав результатів (Google Maps повернув пустий масив `ZERO_RESULTS`), поле вводу підсвічується червоною рамкою і з'являється попередження: _«На жаль таке місце ми не знайшли»_. Помилка автоматично зникає при введенні нового тексту користувачем або при виборі точки кліком на карті.
3. **Розмиття фокусу (Focus blur):**
   Після завершення пошуку та отримання результатів, фокус автоматично знімається з кнопки пошуку, повертаючи її у вихідний стан.
