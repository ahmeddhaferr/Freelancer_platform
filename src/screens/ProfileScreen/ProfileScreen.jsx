import { useState } from 'react';
import Card from '../../components/Card/card';
import DonutChart from '../../components/charts/DonutChart';
import Container from '../../components/Container/container';
import CommentsIcon from '../../CustomIcons/CommentsIcon';
import EditIcon from '../../CustomIcons/EditIcon';
import HeartIcon from '../../CustomIcons/HeartIcon';
import MoreIcon from '../../CustomIcons/MoreIcon';
import PlusIcon from '../../CustomIcons/PlusIcon';
import UserIcon from '../../CustomIcons/UserIcon';
import TaskDoneIcon from '../../CustomIcons/TaskDoneIcon';
import styles from './ProfileScreen.module.css'
import EmptyStarIcon from '../../CustomIcons/EmptyStarIcon';
import Star2Icon from '../../CustomIcons/Star2Icon';
import { CHART_DATA, POSTS, PROJECTS, RATING } from './profileData';

const buildPostMap = (initialValue) =>
  POSTS.reduce((acc, post) => ({ ...acc, [post.id]: initialValue }), {});

const ProfileScreen = () => {
  
  const [likedPosts, setLikedPosts] = useState({});
  const [likeCounts, setLikeCounts] = useState(buildPostMap(0));
  const [openComments, setOpenComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [commentsByPost, setCommentsByPost] = useState(buildPostMap([]));

    const toggleLike = (postId) => {
      setLikedPosts((prev) => {
        const isLiked = !prev[postId];
        setLikeCounts((current) => ({
          ...current,
          [postId]: Math.max(0, (current[postId] || 0) + (isLiked ? 1 : -1)),
        }));
        return { ...prev, [postId]: isLiked };
      });
    };

    const toggleComments = (postId) => {
      setOpenComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
    };

    const addComment = (postId) => {
      const value = (commentInputs[postId] || "").trim();
      if (!value) return;
      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), value],
      }));
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    };

    return (
        <div className={styles.ProfileScreen}>
            <Container>
                <div className={styles.content}>
                    <section className={styles.section1}>
                        <Card>
                            <div className={styles.userProfile}>
                                <div className={styles.userInfo}>
                                <img src="./avatar.png" alt="" />
                                <div>
                                    <h2>Mustafa Emad</h2>
                                    <p>Business scope</p>
                                </div>
                                </div>
                                <div className={styles.action}>
                                    <EditIcon />
                                </div>
                            </div>
                            <div className={styles.about}>
                                <div className={styles.aboutHead}>
                                    <b>About</b>
                                    <EditIcon />
                                </div>
                                <p>
                                GreenTech Solutions Inc. Renewable Energy & Technology San
                                Francisco, California, with operations in North America and
                                Europe
                                </p>
                            </div>
                            
                            <div className={styles.history}>
                                <div className={styles.historyHead}>
                                    <b>Projects History</b>
                                    <div className={styles.actions}>
                                        <PlusIcon />
                                        <EditIcon />
                                    </div>
                                </div>

                                {PROJECTS.map((p) => (
                                <div className={styles.projectItem} key={p.id}>
                                    <div className={styles.guid}>
                                        <div className={styles.dot}></div>
                                        <div className={styles.line}></div>
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <h4>{p.title}</h4>
                                        <small>{p.createdAt}</small>
                                        <p className={styles.itemDesc}>{p.desc}</p>
                                    </div>
                                </div>
                                ))}
                            </div>
                            <div className={styles.posts}>
                                <div className={styles.postsHead}>
                                    <b>Your Activity</b>
                                    <div className={styles.actions}>
                                        <PlusIcon />
                                        <EditIcon />
                                    </div>
                                </div>
                                {POSTS.map((post) => (
                                <Card marginTop={16} key={post.id}>
                                    <div className={styles.postItem}>
                                    <div className={styles.postHead}>
                                        <div className={styles.postClient}>
                                        <div className={styles.postAvatar}></div>
                                        <div>
                                            <b className={styles.postClientName}>
                                            {post?.client?.name}
                                            </b>
                                            <br />
                                            <small className={styles.postClientDate}>
                                            {post?.client?.createdAt}
                                            </small>
                                        </div>
                                        </div>

                                        <div className={styles.postClientAction}>
                                        <div className={styles.tag}>Available</div>
                                        <MoreIcon />
                                        </div>
                                    </div>

                                    <div className={styles.postBody}>
                                        <b className={styles.postTitle}>{post?.title}</b>
                                        <p className={styles.postDesc}>{post.desc}</p>
                                    </div>

                                    {!!post?.image ? (
                                        <img className={styles.postImage} src={post?.image} />
                                    ) : (
                                        <div>
                                        <div className={styles.moreInfo}>
                                            <b className={styles.infoTitle}>Duration of project</b>
                                            <p className={styles.infoValue}>{post.duration}</p>
                                        </div>
                                        <div className={styles.moreInfo}>
                                            <b className={styles.infoTitle}>Pricing</b>
                                            <p className={styles.infoValue}>
                                            Hourly $ {post.price}
                                            </p>
                                        </div>
                                        </div>
                                    )}

                                    <div className={styles.postFooter}>
                                        <button
                                          className={`${styles.footerItem} ${styles.actionBtn} ${likedPosts[post.id] ? styles.activeAction : ""}`}
                                          onClick={() => toggleLike(post.id)}
                                        >
                                          <HeartIcon /> <span>like ({likeCounts[post.id] || 0})</span>
                                        </button>
                                        <button
                                          className={`${styles.footerItem} ${styles.actionBtn}`}
                                          onClick={() => toggleComments(post.id)}
                                        >
                                          <CommentsIcon /> <span>comment ({(commentsByPost[post.id] || []).length})</span>
                                        </button>
                                    </div>
                                    {openComments[post.id] ? (
                                      <div className={styles.commentBox}>
                                        <div className={styles.commentInputRow}>
                                          <input
                                            type="text"
                                            placeholder="Write a comment..."
                                            value={commentInputs[post.id] || ""}
                                            onChange={(e) =>
                                              setCommentInputs((prev) => ({
                                                ...prev,
                                                [post.id]: e.target.value,
                                              }))
                                            }
                                          />
                                          <button onClick={() => addComment(post.id)}>Send</button>
                                        </div>
                                        {(commentsByPost[post.id] || []).map((comment, index) => (
                                          <p key={`${post.id}-${index}`} className={styles.commentItem}>
                                            {comment}
                                          </p>
                                        ))}
                                      </div>
                                    ) : null}
                                    </div>
                                </Card>
                                ))}
                            </div>
                            
                        </Card>
                    </section>
                    <section className={styles.section2}>
                        <Card>
                            <h3 className={styles.ActivityHeader}>Your Activity</h3>
                            <div className={styles.Chart}>
                                <DonutChart data={CHART_DATA} barSize={18} size={200}>
                                    <div>Projects</div>
                                    <div>Progress</div>
                                </DonutChart>
                            </div>
                            <div className={styles.ChartInfo}>
                                <div className={styles.ChartInfoItem}>
                                    <div className={styles.dot} style={{backgroundColor: '#d3d3d3'}}></div>
                                    <p>Posted projects</p>
                                </div>
                                <div className={styles.ChartInfoItem}>
                                    <div className={styles.dot} style={{backgroundColor: '#FFD700'}}></div>
                                    <p>Pending projects</p>
                                </div>
                                <div className={styles.ChartInfoItem}>
                                    <div className={styles.dot} style={{backgroundColor: '#32CD32'}}></div>
                                    <p>Completed projects</p>
                                </div>
                            </div>
                            <div className={styles.infoList}>
                                <div className={styles.infoItem}>
                                    <UserIcon width={24} height={24} />
                                    <div className={styles.label}>freelancer worked with</div>
                                    <div className={styles.value}>8</div>
                                </div>
                                <div className={styles.infoItem}>
                                    <HeartIcon />
                                    <div className={styles.label}>Given Likes</div>
                                    <div className={styles.value}>32</div>
                                </div>
                                <div className={styles.infoItem}>
                                    <TaskDoneIcon />
                                    <div className={styles.label}>Project Posted</div>
                                    <div className={styles.value}>14</div>
                                </div>
                            </div>
                        </Card>
                        <Card marginTop={24}>
                            <h3 className={styles.rateTitle}>Rating</h3>
                            <p className={styles.rateSubtitle}>Average Rating</p>
                            <div className={styles.ratingStars}>
                                <b>{RATING.starRate}</b>
                                <div>
                                    {+RATING.starRate >= 1? <Star2Icon />: <EmptyStarIcon /> }
                                    {+RATING.starRate >= 2? <Star2Icon />: <EmptyStarIcon /> }
                                    {+RATING.starRate >= 3? <Star2Icon />: <EmptyStarIcon /> }
                                    {+RATING.starRate >= 4? <Star2Icon />: <EmptyStarIcon /> }
                                    {+RATING.starRate >= 5? <Star2Icon />: <EmptyStarIcon /> }
                                </div>
                            </div>
                            <div className={styles.ratingBar}>
                                <div className={styles.barItem}>
                                    <b>High rate</b>
                                    <div className={styles.bar}>
                                        <div style={{width: `${RATING.highRate}%`, backgroundColor: '#4DB251'}}></div>
                                    </div>
                                    <p>{RATING.highRate}%</p>
                                </div>
                                <div className={styles.barItem}>
                                    <b>Mid rate</b>
                                    <div className={styles.bar}>
                                        <div style={{width: `${RATING.midRate}%`, backgroundColor: '#FFBF00'}}></div>
                                    </div>
                                    <p>{RATING.midRate}%</p>
                                </div>
                                <div className={styles.barItem}>
                                    <b>low rate</b>
                                    <div className={styles.bar}>
                                        <div style={{width: `${RATING.lowRate}%`, backgroundColor: '#E4636F'}}></div>
                                    </div>
                                    <p>{RATING.lowRate}%</p>
                                </div>
                            </div>
                        </Card>
                        <Card marginTop={24}>
                            <h3 className={styles.titleReviews}>Reviews</h3>
                            <p className={styles.subtitleReviews}>Total People who visited your profile</p>
                            <p className={styles.reviews}><b>70</b> review</p>
                            <button className={styles.seeAllReviews}>See all</button>
                        </Card>

                    </section>
                </div>
            </Container>
        </div>
    )
}
export default ProfileScreen;