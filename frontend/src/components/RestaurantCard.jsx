import { Heart, Star, Timer } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { formatCurrency } from '../utils/currency'
import { useCustomer } from '../hooks/useCustomer'

export default function RestaurantCard({ restaurant }) {
  const { user, favorites, toggleFavorite } = useCustomer()
  const location = useLocation()
  const navigate = useNavigate()
  const isFavorite = favorites.includes(restaurant.id)

  function handleFavorite() {
    if (user?.role === 'CUSTOMER') {
      toggleFavorite(restaurant.id)
      return
    }

    navigate('/login', {
      state: {
        from: `${location.pathname}${location.search}${location.hash}`,
        pendingAction: { type: 'toggleFavorite', restaurantId: restaurant.id },
      },
    })
  }

  return (
    <article className="restaurant-card">
      <Link className="restaurant-card-link" to={`/restaurant/${restaurant.id}`}>
        <div className="restaurant-image-wrap">
          <img src={restaurant.image} alt={`${restaurant.name} dishes`} loading="lazy" />
          {restaurant.offer && <span className="offer-ribbon">{restaurant.offer}</span>}
        </div>
        <div className="restaurant-card-copy">
          <div className="restaurant-card-title">
            <h3>{restaurant.name}</h3>
            <span className="rating"><Star size={13} fill="currentColor" /> {restaurant.rating}</span>
          </div>
          <p>{restaurant.cuisine.join(' · ')}</p>
          <div className="restaurant-card-meta">
            <span><Timer size={14} /> {restaurant.deliveryTime}</span>
            <span>{formatCurrency(restaurant.priceForTwo)} for two</span>
          </div>
        </div>
      </Link>
      <button
        className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
        type="button"
        aria-label={isFavorite ? `Remove ${restaurant.name} from favourites` : `Save ${restaurant.name}`}
        aria-pressed={isFavorite}
        onClick={handleFavorite}
      >
        <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
      </button>
    </article>
  )
}
