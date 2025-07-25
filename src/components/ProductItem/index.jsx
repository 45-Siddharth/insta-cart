import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {ThreeDots} from 'react-loader-spinner'
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import SimilarProducts from '../SimilarProducts'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failed: 'FAILED',
  inProgress: 'IN_PROGRESS',
}

class ProductItem extends Component {
  state = {quantity: 1, productData: {}, status: apiStatus.initial}

  componentDidMount = () => {
    this.getProductItem()
  }

  onIncrement = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))
  }

  onDecrement = () => {
    const {quantity} = this.state
    if (quantity > 1)
      this.setState(prevState => ({
        quantity: prevState.quantity - 1,
      }))
  }

  getProductItem = async () => {
    this.setState({status: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(`https://apis.ccbp.in/products/${id}`, options)
    if (response.ok === true) {
      const data = await response.json()
      const modifiedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        similarProducts: this.updatedSimilarProducts(data.similar_products),
      }
      this.setState({productData: modifiedData, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failed})
    }
  }

  updatedSimilarProducts = list =>
    list.map(ele => ({
      id: ele.id,
      imageUrl: ele.image_url,
      title: ele.title,
      style: ele.style,
      price: ele.price,
      description: ele.description,
      brand: ele.brand,
      totalReviews: ele.total_reviews,
      rating: ele.rating,
      availability: ele.availability,
    }))

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
     <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="blue"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  )

  renderNoProductsView = () => (
    <div className="loader-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
      />
      <h1>Product Not Found</h1>
      <Link to="/products">
        <button type="button">Continue Shopping</button>
      </Link>
    </div>
  )

  renderProductView = () => {
    const {quantity, productData} = this.state
    const {
      imageUrl,
      title,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
      similarProducts,
    } = productData
    return (
      <div className="specific-product-background">
        <Header />
        <div className="specific-product-container">
          <div className="specific-product-image-container">
            <img src={imageUrl} alt="product" className="specific-image" />
          </div>
          <div className="specific-product-details">
            <h1 className="product-title">{title}</h1>
            <p className="price">Rs {price}/-</p>
            <p className="star-container">
              <p className="star-style">
                {rating}
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star-icon"
                />
              </p>
              {totalReviews} Reviews
            </p>
            <p className="description">{description}</p>
            <p className="side-value">
              <span className="side-head">Available:</span>
              {availability}
            </p>
            <p className="side-value">
              <span className="side-head">Brand:</span>
              {brand}
            </p>
            <hr className="line" />
            <div className="button-container">
              <button
                type="button"
                className="count-button"
                onClick={this.onIncrement}
                data-testid="plus"
              >
                <BsPlusSquare />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="count-button"
                onClick={this.onDecrement}
                data-testid="minus"
              >
                <BsDashSquare />
              </button>
            </div>
            <button type="button" className="cart-button">
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="similar-products-container">
          <h1>Similar Products</h1>
          <ul className="similar-product-list-container">
            {similarProducts.map(ele => (
              <SimilarProducts key={ele.id} details={ele} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {status} = this.state
    switch (status) {
      case apiStatus.success:
        return this.renderProductView()
      case apiStatus.failed:
        return this.renderNoProductsView()
      case apiStatus.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default ProductItem
