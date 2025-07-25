import './index.css'

const SimilarProducts = props => {
  const {details} = props
  const {imageUrl, title, price, brand, rating} = details
  return (
    <li className="similar-product-item">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="similar-product-image"
      />
      <p className="similar-product-title">{title}</p>
      <p className="brand">by {brand}</p>
      <div className="price-rating">
        <p className="similar-product-price">Rs {price}/-</p>
        <div className="rating-style">
          {rating}
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star-icon"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProducts
